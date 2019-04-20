import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MapquestService {

  constructor(private http: HttpClient) { }

  // get the directions for 2 points on a map
  getMapDirections(): Observable<any> {
    console.log('inside of getMapDirections function...');

    const mapQuestKey = 'g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U';

    const directions: string =
    `http://open.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA`;
    return this.http
           .jsonp(directions, 'callback');
  }


}


// http://open.mapquestapi.com/directions/v2/route?key=g1o4dcIFlsae3EJOc3hLUm1X89mSSs8U&from=Cambridge,MA&to=Boston,+MA
