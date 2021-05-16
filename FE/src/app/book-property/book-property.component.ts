import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Property } from '../property';
import { PropertyService } from '../property/property.service';

@Component({
  selector: 'app-book-property',
  templateUrl: './book-property.component.html',
  styleUrls: ['./book-property.component.css']
})
export class BookPropertyComponent implements OnInit {
  
  property!: Property;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getPropertyDetail();
  }

  onSubmit() {
    let propertyId = this.property._id;
    let startDate = this.range.value.start;
    let endDate = this.range.value.end;

    this.http.post<any>('/api/bookProperty', {
      propertyId: propertyId,
      startDate: startDate,
      endDate: endDate
    }).subscribe(
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
            this.router.navigateByUrl('/');
          }
        });
      },
      err => {
        console.log(err)
        Swal.fire({
          title: 'Eroare',
          text: err.error.message,
          icon: 'error',
          focusConfirm: true,
          confirmButtonText: 'OK'
        })
        .then((result) => {
          if(result.isConfirmed) {
            if ( err.status == "401") {
              this.router.navigateByUrl('/login');
            }
          }
        });
      }
    )

  }

  getPropertyDetail(): void {
    const propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.propertyService.getPropertyDetail(propertyId)
    .subscribe(property => this.property = property);
  }
}
