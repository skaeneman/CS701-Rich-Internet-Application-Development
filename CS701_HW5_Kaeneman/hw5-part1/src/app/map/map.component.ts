
import { Component, OnInit } from '@angular/core';
import { MapquestService } from '../services/mapquest.service';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  items$: Observable<string[]>;

  completeData: any;

  legs: any;

  private searchTerms: Subject<string>;

  constructor(private mapService: MapquestService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {

    this.searchTerms = new Subject<string>();

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

    this.searchTerms.pipe(
        // wait 1000ms after each keystroke before considering the term
        debounceTime(1000),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.mapService.getFullResults(term)
        )
      )
    .subscribe((result: any)=> {
            console.log(result);
            this.completeData = result;
            this.legs = result.route.legs[0].maneuvers;
          });

  }

    ngAfterViewInit() {
    this.search('Angular');
  }


}
