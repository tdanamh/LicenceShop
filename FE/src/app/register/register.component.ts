import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  get form() {
    return this.registerForm.controls;
  }

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
