import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../user';
import { Property } from '../property';
import { BookProperty } from '../bookProperty';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'Renting';
  users!: Array<User>;
  properties!: Array<Property>;
  bookings!: Array<BookProperty>;

  dataSourceUsers!: any
  dataSourceProperties!: any
  dataSourceBookings!: any

  displayedColumnsUsers: string[] = ['email', 'firstName', 'lastName', 'isAdmin'];
  displayedColumnsProperties: string[] = ['name', 'address', 'country', 'city'];
  displayedColumnsBookings: string[] = ['userId', 'propertyId', 'propertyName', 'startDate', 'endDate'];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.populateUsers();
  }

  applyFilter(event: Event, object: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    switch(object) { 
      case 'property': { 
        this.dataSourceProperties.filter = filterValue.trim().toLowerCase();
        break; 
      } 
      case 'booking': {
        this.dataSourceBookings.filter = filterValue.trim().toLowerCase();
        break; 
      } 
      default: { 
        this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
        break; 
      } 
    }
  }

  logOut(): void {
    localStorage.setItem('AUTH', '');
    this.router.navigateByUrl('/admin-login');
  }

  populateUsers(): void {
    this.http.get<any>('/api/users')
    .subscribe(
      data => {
        this.users = data.users;
        this.dataSourceUsers = new MatTableDataSource(this.users);
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
        this.dataSourceProperties = new MatTableDataSource(this.properties);
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
        this.dataSourceBookings = new MatTableDataSource(this.bookings);
      },
      err => {
        console.log(err);
      }
    )
  }
}
