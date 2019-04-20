import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../../model/contact';
import { AddressProviderService } from
          '../../model/address-provider.service';

@Component({
  selector: 'app-address-book-add-edit',
  templateUrl: './address-book-add-edit.component.html',
  styleUrls: ['./address-book-add-edit.component.css']
})
export class AddressBookAddEditComponent implements OnInit {

	friend: Contact;
	title:  string;

  constructor(
          private route: ActivatedRoute,
          private provider: AddressProviderService,
          private router: Router) { }

  ngOnInit() {
  	let id = this.route.snapshot.params['id'];
    if (id) {
        this.title = 'Edit Contact';
        this.friend = this.provider.getFriend(id);
    } else {
    	this.title = "Add Contact";
			this.friend = this.provider.addFriend();
		}
		console.log(this.friend);
  }

  // save a new contact to the array
  saveFriend() {
    if (this.isComplete()) {
      console.log('Saving friend: ' + this.friend.name);
      this.provider.saveFriend(this.friend);
      // redirect to info
      this.router.navigate(['']);
    }
  }

  // form validation
  private isComplete() {
    let c: Contact = this.friend;
    if (c.id &&
        c.name && c.name.length > 0 &&
        c.address && c.address.length > 0 &&
        c.phone && c.phone.length > 0) {
      return true;
    } else {
      return false;
    }
  }




}
