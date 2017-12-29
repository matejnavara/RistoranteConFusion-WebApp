import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(fb: Feedback): Observable<Feedback> {
    const newFeedback = this.restangular.all('feedback').post(fb);
    return newFeedback;
  }

}
