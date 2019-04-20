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

  private mapRoute: Subject<Array<string>>;
  route: any;

  constructor(private mapQuestService: MapquestService) { }

   // push the map route into observable stream
   pushRoute(route: Array<string>): void {
    this.mapRoute.next(route);
  }

  ngOnInit() {

    this.mapRoute = new Subject<Array<string>>();

    this.mapQuestService
    .getMapDirections()
    .subscribe(result =>
        {
          console.log(result);
        });



    this.mapRoute.pipe(
      debounceTime(1000),
      switchMap( (route: Array<string>) => {
        return this.mapQuestService.getMapDirections(route);
      }),
      distinctUntilChanged()
    ).subscribe( (result: any) => {
      this.route = result.route;
    });


  }

}
