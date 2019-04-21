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



  getResults(term: string): Observable<string[]> {
    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';
  	// let url: string = `http://en.wikipedia.org/w/api.php?search=${term}&action=opensearch&format=json`;
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

  getFullResults(term: string): Observable<any> {
    // let url: string = `http://en.wikipedia.org/w/api.php?search=${term}&action=opensearch&format=json`;
    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';
    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA`;

    return this.http
               .jsonp(url, 'callback');
  }



}




