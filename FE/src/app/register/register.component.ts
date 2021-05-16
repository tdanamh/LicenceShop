import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message!: string;

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
  const email = this.registerForm.value.email;
  const password = this.registerForm.value.password;
  const firstName = this.registerForm.value.firstName;
  const lastName = this.registerForm.value.lastName;
  
  this.http.post<any>('/api/users', {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    isAdmin: false,
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
}
