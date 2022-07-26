import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  cars:any = [];
  constructor(private carService:CarService) { }

  ngOnInit() {
  }

  getCarsByBrand(brand){
    this.carService.getCarByBrand(brand.value)
    .subscribe(resp => {
      this.cars = resp;
      console.log(this.cars);
    })
  }
}
