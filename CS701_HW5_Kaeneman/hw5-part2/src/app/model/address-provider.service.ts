import { Injectable } from '@angular/core';

import { Contact } from './contact';
import { CONTACTS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class AddressProviderService {

  constructor() { }

  getFriends(): Contact[] {
  	return CONTACTS;
  }

  getFriend(id: number): Contact {
  	let friends:Contact[] = this.getFriends();
    let friend: Contact = friends.find(
    		f => {return (f.id == id)});
    return friend;
  }

  addFriend(): Contact {
  	let friends:Contact[] = this.getFriends();
  	let maxId: number;

  	if (friends && friends.length > 0) {
  		maxId = friends[friends.length - 1].id;
  	} else {
  		maxId = 0;
  	}

  	let friend: Contact = new Contact();
  	friend.id = maxId + 1;
  	// friends.push(friend);
  	return friend;
  }

  // save a contact
  saveFriend(friend: Contact): void {
  	let contacts:Contact[] = this.getFriends();
  	let target: Contact = contacts.find(c => {return (c.id == friend.id)});
  	if (!target) {
  		contacts.push(friend);
  	} else {
      console.log('target ', target, 'friend ', friend);
      Object.assign(target, friend);
    }
  }

  // remove a contact
  deleteFriend(friend: Contact) {
    if (confirm('You are about to delete: ' + friend.name)) {
      // get all the contacts
      const contacts:Contact[] = this.getFriends();
      // loop through array and delete a contact
      const index = contacts.indexOf(friend, 0);
      if (index > -1) {
        console.log('Deleting: ' + friend.name);
        contacts.splice(index, 1);
      }
    }
  }


}
