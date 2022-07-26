import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage implements OnInit {

  invoice:any= {}
  car:any={}
  constructor(
    private activateRoute:ActivatedRoute,
    private carService:CarService,
    private invoiceService:InvoiceService
  ) { }

  ngOnInit() {
    this.getInvoice();
  }

  
  getInvoice(){
    let invoiceId = ''
    this.activateRoute.paramMap.subscribe(paramMap => {
      invoiceId = paramMap.get('id');
    })

    this.invoiceService.getInvoice(invoiceId)
    .subscribe(resp => {
      this.invoice = resp;
      this.getCar();
    })

  }
  
  getCar(){
    this.carService.getCar(this.invoice['id_car'])
    .subscribe(resp => {
      this.car = resp[0];
    })
  }
}
