var cartModule = angular.module('cart', [])

cartModule.controller('CartController', function ($scope) {

    // check localStorage to see if books alredy exist
    var localStorageBooks = JSON.parse(localStorage.getItem('kaeneman_cart'));
    if (localStorageBooks) {
        $scope.books = localStorageBooks;
    } else {
        $scope.books = [
        {title: 'Absolute Java',    
            qty: 1, price: 114.95},
        {title: 'Pro HTML5',        
            qty: 1, price: 27.95},
        {title: 'Head First HTML5', 
            qty: 1, price: 27.89}
        ];
    }

    $scope.removeBook = function(index) {
      $scope.books.splice(index, 1);
    //   $scope.saveBook(); // update localStorage
    }

    // add a new book
    $scope.newBook = function(index) {
      $scope.books.push({
         title: 'New Book',    
         qty: 1, 
         price: 10.99
      })
    }

    // save a book to localStorage
    $scope.saveBook = function(index) {
        localStorage.setItem('kaeneman_cart', angular.toJson($scope.books));
    }

    // update book total
    var books = $scope.books;
    $scope.updateTotal = function() {
        $scope.total = 0;
        for (var i = 0; i < books.length; i++) {
          // console.log('books[i]', books[i].price);
          $scope.total += (books[i].price * books[i].qty);
        }
    }

    $scope.count = 0;
    $scope.updateBookCount = function() {
        console.log("updateBookCount...");
        $scope.count = $scope.books.length;
    }
    
    $scope.$watch('books', function() {
        $scope.updateBookCount();
        $scope.updateTotal();
    }, true)
    
  });