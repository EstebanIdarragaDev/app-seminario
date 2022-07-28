import { Component, ElementRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  userId: '';
  constructor(private router:Router,
    private userService:UserService,
    private alertCtrl:AlertController) {}
  
  validateLogin(user,password){
    const datos = {
      correo: user.value,
      contrasena: password.value
    }
    for(let i in datos){
      if(datos[i] == ''){
        return this.createAlert('Error','Debe completar todos los campos')
      }
    }


    this.userService.validateLogin(datos)
    .subscribe(resp => {
      if(resp['status'] == false){
        return this.createAlert('Error', resp['message']);
      }else{
        this.userId = resp['data']['_id'];
        this.createSessionLocal(this.userId);
        this.router.navigate(['/tabs']);
      }
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

  createSessionLocal(userId){
    localStorage.setItem('userSession',userId);
  }



}
