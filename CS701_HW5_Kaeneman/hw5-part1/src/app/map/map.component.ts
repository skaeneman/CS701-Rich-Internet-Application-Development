
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapquestService } from '../services/mapquest.service';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapquestService]
})
export class MapComponent implements OnInit {

  // items$: Observable<string[]>;

  completeData: any;
  legs: any;
  routeDistance: string;
  routeTime: string;
  mapDirections: Array<string> = [null, null];

  private searchTerms: Subject<Array<string>>;

  // setup initial values to load map with
  searchFrom = 'Boston, MA';
  searchTo = 'Cambridge, MA';

  constructor(private mapService: MapquestService) {  }

  // Push a search term into the observable stream.
  search(term: Array<string>): void {
    this.searchTerms.next(term);
  }

  startPoint(from: string): void {
    console.log('startPoint from', from);
    if ( from != null ) {
      this.mapDirections[0] = from;
    }
    this.search(this.mapDirections);
  }

  endPoint(to: string): void {
    console.log('startPoint to', to);
    if ( to != null ) {
      this.mapDirections[1] = to;
    }
    this.search(this.mapDirections);
  }

  ngOnInit() {

    // this.searchTerms = new Subject<string>();
    this.searchTerms = new Subject<Array<string>>();

    this.searchTerms.pipe(
        // wait 2000ms after each keystroke before considering the term
        debounceTime(2000),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        switchMap((terms: Array<string>) => {
          console.log('getting search term...', terms.length);
          return this.mapService.getFullResults(terms);
        })
      )
    .subscribe((result: any)=> {
            console.log(result);
            this.completeData = result;
            this.legs = result.route.legs[0].maneuvers;
            this.routeDistance = result.route.distance;
            this.routeTime = result.route.formattedTime;
          });

  }

    // load page with initial values for map
    ngAfterViewInit() {
      this.search([this.searchFrom, this.searchTo]);
  }


}
