import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

   cars = [];

  constructor(
    private carsService:CarService,
    private geolocation:Geolocation,
    private alertCtrl:AlertController) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(){
    this.carsService.getAllCars()
    .subscribe(resp => {
      this.cars = resp['data'];
    });
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
