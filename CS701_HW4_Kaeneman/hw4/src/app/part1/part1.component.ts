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

  // delete a book
  removeBook = function(index) {
    this.books.splice(index, 1);
  }  

    // add a new book
    newBook = function() {
      this.books.push({
         title: 'New Book',    
         qty: 1, 
         price: 10.99
      })
    }  

    // store book in localStorage
    saveBook = function() {
      localStorage.setItem('kaeneman_cart', JSON.stringify(this.books));
  }    

    // update book total    
    updateTotal = function() {
      let total = 0;
      let bks = this.books;
      for (var i = 0; i < bks.length; i++) { 
        total += (bks[i].price * bks[i].qty);
      }
      return total;
  }  

}
