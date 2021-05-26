import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message!: string;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.http.post<any>('/api/users/login', {
      email: email,
      password: password
    }).subscribe(
      data => {
        let token = data.token;
        localStorage.setItem('AUTH', token)
        this.router.navigateByUrl('/account');
      },
      err => {
        this.message = err.error.message;
      }
    )
  }

  resetPassword() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: {
       
      }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      // console.log(result);
    });
  }
}
