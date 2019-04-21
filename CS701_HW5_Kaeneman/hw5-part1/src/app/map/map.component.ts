
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

  // start of trip
  startPoint(from: string): void {
    console.log('startPoint from', from);
    if (from != null) {
      this.mapDirections[0] = from;
    }
    this.search(this.mapDirections);
  }

  // end of trip
  endPoint(to: string): void {
    console.log('startPoint to', to);
    if (to != null) {
      this.mapDirections[1] = to;
    }
    this.search(this.mapDirections);
  }



// findDirections() {
//   let count = 0;
//   this.searchTerms.pipe(
//     // wait 1000ms after each keystroke before considering the term
//     debounceTime(1000),
//     // ignore new term if same as previous term
//     distinctUntilChanged(),
//     switchMap((terms: Array<string>) => {
//       // console.log('getting search term...', terms);
//       count += 1;
//       console.log(count);
//       return this.mapService.getFullResults(terms);
//     })
//   )
// .subscribe((result: any)=> {
//         console.log(result);
//         this.completeData = result;
//         this.legs = result.route.legs[0].maneuvers;
//         this.routeDistance = result.route.distance;
//         this.routeTime = result.route.formattedTime;
//       });
// }


  // update map when button clicked
  updateMap(from: string, to: string) {
    console.log('inside updateMap: ', from , '', to);
    if (to !== '' && from !== '') {
      this.mapDirections[0] = from;
      this.mapDirections[1] = to;
      this.search(this.mapDirections);
      console.log('map directions ', this.mapDirections[0], this.mapDirections[1]);
      return this.mapService.getFullResults(this.mapDirections);

      // TRY PUTTING THE FROM AND TO INTO AN ARRAY AND THEN CALLING THIS.ARRAY.PIPE
      // OR FIND A WAY TO GET THE VALUES BACK FROM  return this.mapService.getFullResults(this.mapDirections); SOMEHOW

      this.searchTerms.pipe(
        // wait 2000ms after each keystroke before considering the term
        debounceTime(2000),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        switchMap((terms: Array<string>) => {
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








      // return this.mapService.getFullResults(this.mapDirections);

      // this.search(this.mapDirections);
      // this.findDirections();
    } else {
      console.log('No input was entered');
    }
  }


  ngOnInit() {

    // this.searchTerms = new Subject<string>();
    this.searchTerms = new Subject<Array<string>>();


  		// this.searchTerms.pipe(
  		// 	// wait 1000ms after each keystroke before considering the term
  		// 	debounceTime(1000),
  		// 	// ignore new term if same as previous term
      // 	distinctUntilChanged(),
      // 	switchMap((terms: Array<string>) =>
      // 		this.mapService.getFullResults(terms)
      // 	)
  		// );


    this.searchTerms.pipe(
        // wait 2000ms after each keystroke before considering the term
        debounceTime(2000),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        switchMap((terms: Array<string>) => {
          console.log('getting search term...', terms.length);
          console.log('this.mapDirections.values', this.mapDirections.values());
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
