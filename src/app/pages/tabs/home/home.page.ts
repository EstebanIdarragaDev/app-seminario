import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

   cars = [];

  constructor(private carsService:CarService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(){
    this.carsService.getAllCars()
    .subscribe(resp => {
      this.cars = resp['data'];
    });
  }
}
