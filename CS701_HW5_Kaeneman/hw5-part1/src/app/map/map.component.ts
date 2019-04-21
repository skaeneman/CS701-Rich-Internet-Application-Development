
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
  mapDirections: Array<string>;

  private searchTerms: Subject<Array<string>>;

  // setup initial values to load map with
  searchFrom = 'Boston, MA';
  searchTo = 'Cambridge, MA';

  constructor(private mapService: MapquestService) { }

  // Push a search term into the observable stream.
  search(term: Array<string>): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {

    // this.searchTerms = new Subject<string>();
    this.searchTerms = new Subject<Array<string>>();

    // this.items$ =
    //   this.searchTerms.pipe(
    //   // wait 1000ms after each keystroke before considering the term
    //   debounceTime(1000),
    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),
    //     switchMap((term: string) =>
    //       this.mapService.getResults(term)
    //     )
    //   );

    // this.mapService
    // .getFullResults(this.searchFrom, this.searchTo)
    // .subscribe(result =>
    //     {
    //       console.log(result);
    //       this.completeData = result;
    //     });

    this.searchTerms.pipe(
        // wait 1500ms after each keystroke before considering the term
        debounceTime(1500),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        switchMap((term: Array<string>) => {
          console.log('getting search term...', term);
          return this.mapService.getFullResults(this.searchFrom, this.searchTo);
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

    ngAfterViewInit() {
    this.search([this.searchFrom, this.searchTo]);
  }


}
