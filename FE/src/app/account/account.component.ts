import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user!: User;

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
  }

  logOut(): void {
    localStorage.setItem('AUTH', '');
    this.router.navigateByUrl('/login');
  }
}
