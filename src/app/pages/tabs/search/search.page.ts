import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  cars:any = [];
  constructor(
    private carService:CarService,
    private geolocation:Geolocation,
    private alertCtrl:AlertController) { }

  ngOnInit() {
  }

  getCarsByBrand(brand){
    this.carService.getCarByBrand(brand.value)
    .subscribe(resp => {
      this.cars = resp;
      console.log(this.cars);
    })
  }

  async getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
         this.createAlert('Localizacion',`Tus cordenadas son: <br> Latitud: ${resp.coords.latitude} <br> Longitud: ${resp.coords.longitude}`)
      }).catch((error) => {
        console.log('Error getting location', error);
      });
   }
 
   async createAlert(header,message){
     const alert = await this.alertCtrl.create({
       header:header,
       message: message,
       buttons:[
         {
           text: 'Ok',
           role: 'cancel'
         }
       ]
       
     });
     alert.present();
   }
}
