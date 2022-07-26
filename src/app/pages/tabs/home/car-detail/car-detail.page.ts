import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ViewChild } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AlertController } from '@ionic/angular';
import { Invoice } from 'src/app/models/invoice';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
})
export class CarDetailPage implements OnInit {

  @ViewChild('dias') dias: ElementRef;
  diasRenta = 1;
  car:any = {};
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private carService:CarService,
    private alertCtrl:AlertController,
    private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getCar();
  }

getCar(){
    let  id = '';
    this.activateRouter.paramMap.subscribe(paramMap => {
      id = paramMap.get('id');
    });

    this.carService.getCar(id)
    .subscribe(resp => {
      this.car = resp[0];
    })
  }

  incrementarDiasRenta(){
    this.diasRenta++;
    if(this.diasRenta>5){
      this.diasRenta = 5;
    }
  }
  disminuirDiasRenta(){
    this.diasRenta--;
    if(this.diasRenta<= 0){
      this.diasRenta = 1;
    }
  }

  async createInvoice(){
    const invoice:any= {
      'id_user':localStorage.getItem('userSession'),
      'id_car': this.car['_id'],
      'dias_rentados': this.diasRenta,
      'precio_dia': this.car['valor_alquiler'],
      'total_pagado': this.car['valor_alquiler'] * this.diasRenta
    }


    const alert = await this.alertCtrl.create({
      header:'Esta seguro ?',
      message: 'Desea rentar este vehiculo',
      buttons:[
        {
          text: 'Canel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler:() => {
            this.invoiceService.createInvoice(invoice)
            .subscribe(resp => {
              if(resp['status']== false){
                console.log(resp);
              }else{
                // console.log(resp);
                this.router.navigate(['/tabs/settings']);
              }
            })
          }
        }
      ]
      
    });
    alert.present()
  }

}
