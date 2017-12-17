import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return Observable.of(PROMOTIONS);
  }

  getPromotion(id: number): Observable<Promotion> {
    return Observable.of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return Observable.of(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
}