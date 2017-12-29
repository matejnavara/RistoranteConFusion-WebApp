import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpService } from './process-http.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
    private processHttpService: ProcessHttpService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions',id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
    .map(promotions => promotions[0]);
  }
}