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

  // // get the directions for 2 points on a map
  //   getMapDirections(route: Array<string>): Observable<any> {
  //   console.log('inside of getMapDirections function...');
  //   // console.log('Start: ' + mapPoints[0] + ' End: ' + mapPoints[1]);

  //   const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';

  //   const directions: string =
  //   `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA`;
  //   return this.http
  //          .jsonp(directions, 'callback');
  // }



  getResults(terms: Array<string>): Observable<string[]> {
    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';
    console.log('getResults mapQuest terms', terms);
    const from = terms[0];
    const to = terms[1];

    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=${from},VA&to=${to}&unit=m`;

    return this.http
               .jsonp(url, 'callback')
               .pipe(
               		map((res: HttpResponse<any>) =>  {
                     console.log(res);
                     return <string[]> res[1];
                   }
                 )
               	)
  }

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




