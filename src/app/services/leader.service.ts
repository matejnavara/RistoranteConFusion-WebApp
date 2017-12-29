import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpService } from './process-http.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHttpService: ProcessHttpService) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders',id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
    .map(leaders => leaders[0]);  }
}
