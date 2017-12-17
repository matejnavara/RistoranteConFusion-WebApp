import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return Observable.of(LEADERS);
  }

  getLeader(id: number): Observable<Leader> {
    return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Observable<Leader> {
    return Observable.of(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
