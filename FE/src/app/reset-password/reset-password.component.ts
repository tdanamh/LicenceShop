import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  resetForm = new FormGroup({
    email: new FormControl('')
  })

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
  }

  resetPassword(): void {
    const email = this.resetForm.value.email;
    // Generate new password
    let newPassword = "";
    for (let i = 0; i < 8; i++) {
      newPassword += Math.floor(Math.random() * 9) + 0;
    }
    this.http.put<any>('/api/users/reset-password', {
      email: email,
      password: newPassword
    })
    .subscribe(
      data => {
        Swal.fire({
          title: 'Succes',
          text: data.message,
          icon: 'success',
          focusConfirm: true,
          confirmButtonText: 'OK'
        })
        .then((result) => {
          if(result.isConfirmed) {
            this.dialog.closeAll();
          }
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
            this.dialog.closeAll();
          }
        });
      }
    )
  }

}
