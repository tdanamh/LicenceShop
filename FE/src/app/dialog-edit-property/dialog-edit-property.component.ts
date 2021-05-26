import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-edit-property',
  templateUrl: './dialog-edit-property.component.html',
  styleUrls: ['./dialog-edit-property.component.css']
})
export class DialogEditPropertyComponent implements OnInit {

  propertyForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    pricePerNight: new FormControl(''),
    adultsNumber: new FormControl(''),
    roomsNumber: new FormControl(''),
    dimmension: new FormControl(''),
    balcony: new FormControl(''),
    privateBathroom: new FormControl(''),
    airConditioning: new FormControl(''),
    freeParking: new FormControl(''),
    breakfastIncluded: new FormControl(''),
    petsAllowed: new FormControl(''),
    distanceFromCenter: new FormControl(''),
    score: new FormControl(''),
    imagesPaths: new FormControl('')
  });

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  changeData(): void {
    const propertyId = this.data.property._id;
    const name = this.propertyForm.value.name;
    const description = this.propertyForm.value.description;
    const address = this.propertyForm.value.address;
    const country = this.propertyForm.value.country;
    const city = this.propertyForm.value.city;
    const pricePerNight = this.propertyForm.value.pricePerNight;
    const adultsNumber = this.propertyForm.value.adultsNumber;
    const roomsNumber = this.propertyForm.value.roomsNumber;
    const dimmension = this.propertyForm.value.dimmension;
    // TODO: check this is ok?
    let balcony = this.propertyForm.value.balcony;
    if (!balcony) {
      // No option selected, balcony remains empty, so we put the old value
      balcony = this.data.property.balcony;
    }
    let privateBathroom = this.propertyForm.value.privateBathroom;
    if (!privateBathroom) {
      privateBathroom = this.data.property.privateBathroom;
    }
    let airConditioning = this.propertyForm.value.airConditioning;
    if (!airConditioning) {
      airConditioning = this.data.property.airConditioning;
    }
    let freeParking = this.propertyForm.value.freeParking;
    if (!freeParking) {
      freeParking = this.data.property.freeParking;
    }
    let breakfastIncluded = this.propertyForm.value.breakfastIncluded;
    if (!breakfastIncluded) {
      breakfastIncluded = this.data.property.breakfastIncluded;
    }
    let petsAllowed = this.propertyForm.value.petsAllowed;
    if (!petsAllowed) {
      petsAllowed = this.data.property.petsAllowed;
    }

    const distanceFromCenter = this.propertyForm.value.distanceFromCenter;
    const score = this.propertyForm.value.score;
    const imagesPaths = this.propertyForm.value.imagesPaths;

    this.http.put<any>('/api/properties', {
      propertyId: propertyId,
      name: name,
      description: description,
      address: address,
      country: country,
      city: city,
      pricePerNight: pricePerNight,
      adultsNumber: adultsNumber,
      roomsNumber: roomsNumber,
      dimmension: dimmension,
      balcony: balcony,
      privateBathroom: privateBathroom,
      airConditioning: airConditioning,
      freeParking: freeParking,
      breakfastIncluded: breakfastIncluded,
      petsAllowed: petsAllowed,
      distanceFromCenter: distanceFromCenter,
      score: score,
      imagesPaths: imagesPaths
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
