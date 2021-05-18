import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../user';
import { Property } from '../property';
import { BookProperty } from '../bookProperty';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users!: Array<User>;
  properties!: Array<Property>;
  bookings!: Array<BookProperty>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.populateUsers();
  }

  populateUsers(): void {
    this.http.get<any>('/api/users')
    .subscribe(
      data => {
        this.users = data.users;
      },
      err => {
        console.log(err);
      }
    )
  }

  populateProperties(): void {
    this.http.get<any>('/api/properties')
    .subscribe(
      data => {
        this.properties = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  populateBookings(): void {
    this.http.get<any>('/api/bookProperty')
    .subscribe(
      data => {
        this.bookings = data.bookings;
      },
      err => {
        console.log(err);
      }
    )
  }
}
