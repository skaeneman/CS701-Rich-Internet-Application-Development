import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  student: string = 'Scott Kaeneman';
  course: string = "CS701";
  assignment: string = "Assignment4";
}
