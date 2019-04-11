import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component implements OnInit {

  books: Array<any>;

  constructor() { }

  ngOnInit() {
    // check localStorage to see if books alredy exist
    var localStorageBooks = JSON.parse(localStorage.getItem('kaeneman_cart'));
   
    if (localStorageBooks) {
        this.books = localStorageBooks;
    } else {
        this.books = [
        {title: 'Absolute Java',    
            qty: 1, price: 114.95},
        {title: 'Pro HTML5',        
            qty: 1, price: 27.95},
        {title: 'Head First HTML5', 
            qty: 1, price: 27.89}
        ];
    }    
  }

}
