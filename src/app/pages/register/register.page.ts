import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private alertCtrl:AlertController,
    private userService:UserService,
    private router:Router) { }

  ngOnInit() {
  }

async createUser(nombres,apellidos,cedula,email,contrasena){

    const newUser:User = {
      nombres: nombres.value,
      apellidos: apellidos.value,
      cedula: cedula.value,
      correo: email.value,
      contrasena: contrasena.value
    }

    for(let i in newUser){
      if(newUser[i] == ''){
        return this.createAlert('Campos basios','Debes completar todos los campos');
      }
    }

    this.userService.createUser(newUser)
    .subscribe(resp => {
      if(resp['status'] == true){
        this.createAlert('Creado',resp['message']);
      }else{
        this.createAlert('Error',resp['message']);
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
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
      
    });
    alert.present();
  }

}
