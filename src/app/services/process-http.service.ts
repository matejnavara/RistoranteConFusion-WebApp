import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class ProcessHttpService {

  constructor() { }

  public extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }

}
