import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Car } from '../models/car';
@Injectable({
  providedIn: 'root'
})
export class CarService implements OnInit{

  private api = 'http://localhost:4000/cars';
  constructor(private http:HttpClient) { }

  
ngOnInit(){
  
}
getAllCars(){
  return this.http.get<Car[]>(this.api);
}

getCar(cardId){
  const path = `${this.api}/${cardId}`;
  return this.http.get(path);
}

getCarByBrand(brand){
  const path = `${this.api}/brand/${brand}`
  return this.http.get(path);
}
}
