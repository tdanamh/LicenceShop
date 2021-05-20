import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { User } from '../user';
import { BookProperty } from '../bookProperty';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user!: User;

  userDataForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  loadMyBookings: Boolean = false;

  myBookings!: Array<BookProperty>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.http.get<any>('/api/users/current-user')
    .subscribe(
      data => {
        this.user = data.currentUser;
      },
      err => {
        console.log(err);
      }
    )
    this.http.get<any>('/api/bookProperty/byUserId')
    .subscribe(
      data => {
        this.myBookings = data.myBookings;
      },
      err => {
        console.log(err);
      }
    )
  }

  toggleMyBookings() {
    this.loadMyBookings = !this.loadMyBookings;
  }

  logOut(): void {
    localStorage.setItem('AUTH', '');
    this.router.navigateByUrl('/login');
  }

  changeData(): void {
    const firstName = this.userDataForm.value.firstName;
    const lastName = this.userDataForm.value.lastName;
    this.http.put<any>('/api/users', {
      firstName: firstName,
      lastName: lastName
    }).subscribe(
      data => {
        this.user = data.user;
        Swal.fire({
          title: 'Succes',
          text: data.message,
          icon: 'success',
          focusConfirm: true,
          confirmButtonText: 'OK'
        });
      },
      err => {
        Swal.fire({
          title: 'Eroare',
          text: err.error.message,
          icon: 'error',
          focusConfirm: true,
          confirmButtonText: 'OK'
        })
        .then((result) => {
          if(result.isConfirmed) {
            this.router.navigateByUrl('/account');
          }
        });
      }
    )
  }
}
