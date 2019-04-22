import { Component, OnInit } from '@angular/core';

import { Contact } from '../../model/contact';
import { AddressProviderService } from
		'../../model/address-provider.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

	friends: Contact[];

  constructor(
    private provider: AddressProviderService,
    private router: Router) { }

  ngOnInit() {
  	this.friends = this.provider.getFriends();
  }

  // call deleteFriend function in model then redirect
  deleteFriend(friend: Contact) {
    this.provider.deleteFriend(friend);
    this.router.navigate(['/']);
  }

}
