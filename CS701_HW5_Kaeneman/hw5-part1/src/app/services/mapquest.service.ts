import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class MapquestService {

  constructor(private http: HttpClient) { }



  getFullResults(terms: Array<string>): Observable<any> {
    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';

    console.log('getFullResults mapQuest terms', terms);

    const from = terms[0];
    const to = terms[1];

    console.log('inside getFullResults...');
    console.log('from ' + terms[0]);
    console.log('to ' + terms[1]);

    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=${from},VA&to=${to}&unit=m`;

    return this.http
               .jsonp(url, 'callback');
  }


  // update the directions when the search button is clicked
  getUpdatedDirections(from: string, to: string): Observable<any> {
    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';
  	let url: string =
    `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=${from},VA&to=${to}&unit=m`;

    return this.http
               .jsonp(url, 'callback');

  }



}




