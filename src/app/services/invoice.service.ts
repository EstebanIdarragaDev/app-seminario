import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private api = 'https://api-seminario-2022.herokuapp.com/invoices'
  constructor(
    private http:HttpClient
    ) { }

  getInvoice(invoiceId){
    const path = `${this.api}/${invoiceId}`;
    return this.http.get(path); 
  }

  createInvoice(invoice:Invoice){
    const path = `${this.api}/create`;
    return this.http.post(path,invoice);
  }

  getInvocesByUserId(userId){
    const path = `${this.api}/invoice/${userId}`;
    return this.http.get(path);
  }
}
