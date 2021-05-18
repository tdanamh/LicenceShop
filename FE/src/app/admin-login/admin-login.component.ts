import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  message!: string;

  adminLoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.adminLoginForm.value.email;
    const password = this.adminLoginForm.value.password;

    this.http.post<any>('/api/admin/login', {
      email: email, 
      password: password
    }).subscribe(
      data => {
        let token = data.token;
        localStorage.setItem('AUTH', token);
        this.router.navigateByUrl('/admin');
      },
      err => {
        this.message = err.error.message;
      }
    )
  }
}
