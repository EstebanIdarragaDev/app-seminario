import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user:any = {}
  invoices:any = [];
  cars: any = [];
  iniciales = ''

  constructor(
    private userService:UserService,
    private invoiceService:InvoiceService,
    private carService:CarService,
    private router:Router) { }

  ngOnInit() {
    this.getUserById();
  }
  
getUserById(){
    const userSession = localStorage.getItem('userSession')
    this.userService.getUserById(userSession)
    .subscribe(resp => {
      this.user = resp['data'][0];
      this.iniciales = this.user['nombres'][0] + this.user['apellidos'][0];
      this.getInvocesByUserId();

    });
  }
getInvocesByUserId(){
    const userId = this.user['_id'];
    this.invoiceService.getInvocesByUserId(userId)
    .subscribe(resp => {
      this.invoices = resp['data'];
      this.getCarById();
    })
  }

  getCarById(){
    this.invoices.forEach(invoice => {
      this.carService.getCar(invoice.id_car)
      .subscribe(resp => {
          this.cars.push(resp[0]);
      })

    });
  }

  editUser(id){
    this.router.navigate(['/tabs/settings/user-profile/'+id]);
  }
}
