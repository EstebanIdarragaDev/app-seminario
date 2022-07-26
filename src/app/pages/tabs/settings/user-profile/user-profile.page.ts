import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user:any={}
  iniciales:any='';
  userId = ''
  constructor(
    private activateRoute:ActivatedRoute,
    private userService:UserService,
    private alertCtrl:AlertController,
    private router:Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    });

    this.userService.getUserById(this.userId)
    .subscribe(resp => {
      if(resp['status'] == true){
        this.user = resp['data'][0];
        this.iniciales = this.user['nombres'][0] + this.user['apellidos'][0]
      }
    });
  }

  async editUser(nombres,apellidos,email){
    const user = {
      nombres: nombres.value,
      apellidos: apellidos.value,
      cedula: this.user['cedula'],
      correo: email.value,
      contrasena: this.user['contrasena']
    }

    const alert = await this.alertCtrl.create({
      header:'Confirmacion',
      message: 'Esta seguro de actualizar los datos',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            this.userService.updateUser(user,this.userId)
            .subscribe(resp => {
              if(resp['status'] == true){
                this.router.navigate(['/tabs/settings'])
              }
            })
          }
        }
      ]
      
    });
    alert.present();

  }
}
