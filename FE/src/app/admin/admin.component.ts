import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../user';
import { Property } from '../property';
import { BookProperty } from '../bookProperty';
import { DialogEditPropertyComponent } from '../dialog-edit-property/dialog-edit-property.component';

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

  displayedColumnsUsers: string[] = ['email', 'firstName', 'lastName', 'isAdmin', 'action'];
  displayedColumnsProperties: string[] = ['name', 'address', 'country', 'city', 'action'];
  displayedColumnsBookings: string[] = ['userId', 'propertyId', 'propertyName', 'startDate', 'endDate', 'status'];

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
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

  deleteUser(id: any): void {
    Swal.fire({
      text: 'Stergeti utilizator?',
      showCancelButton: true,
      confirmButtonText: 'DA',
      focusConfirm: true,
    })
    .then((result) => {
      if(result.isConfirmed) {
        // Delete user
        const route = '/api/users/' + id;
        this.http.delete<any>(route)
        .subscribe(
          data => {
            Swal.fire({
              title: 'Succes',
              text: data.message,
              icon: 'success',
              focusConfirm: true,
              confirmButtonText: 'OK'
            });
            this.populateUsers();
          },
          err => {
            console.log(err);
          }
        )
      } else {
        this.router.navigateByUrl('/admin');
      }
    });
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

  deleteProperty(id: any): void {
    Swal.fire({
      text: 'Stergeti proprietate?',
      showCancelButton: true,
      confirmButtonText: 'DA',
      focusConfirm: true,
    })
    .then((result) => {
      if(result.isConfirmed) {
        // Delete property
        const route = '/api/properties/' + id;
        this.http.delete<any>(route)
        .subscribe(
          data => {
            Swal.fire({
              title: 'Succes',
              text: data.message,
              icon: 'success',
              focusConfirm: true,
              confirmButtonText: 'OK'
            });
            this.populateProperties();
          },
          err => {
            console.log(err);
          }
        )
      } else {
        this.router.navigateByUrl('/admin');
      }
    });
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

  editProperty(property: any): void {
    const dialogRef = this.dialog.open(DialogEditPropertyComponent, {
      data: {
        property: property
      }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      this.populateProperties();
    });
  }
  
  addNewProperty(): void {
    // open dialog box 
  }
}
