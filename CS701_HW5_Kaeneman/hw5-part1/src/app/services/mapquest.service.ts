import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

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



  getResults(term: Array<string>): Observable<string[]> {
    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';
    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA`;

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

  getFullResults(from: string, to: string): Observable<any> {
    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';
    // const from = 'Boston, MA';
    // const to = 'Cambridge, MA';

    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=${from},VA&to=${to}&unit=m`;

    return this.http
               .jsonp(url, 'callback');
  }



}




