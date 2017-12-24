import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpService } from './process-http.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHttpService: ProcessHttpService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
                    .map(res => { return this.processHttpService.extractData(res); });
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/'+ id)
                    .map(res => { return this.processHttpService.extractData(res); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .map(res => { return this.processHttpService.extractData(res)[0]; });
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) });
  }
}