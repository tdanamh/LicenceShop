import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-dialog-new-property',
  templateUrl: './dialog-new-property.component.html',
  styleUrls: ['./dialog-new-property.component.css']
})
export class DialogNewPropertyComponent implements OnInit {

  propertyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    pricePerNight: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    adultsNumber: new FormControl('2', [Validators.required, Validators.pattern("^[0-9]*$")]),
    roomsNumber: new FormControl('2', [Validators.required, Validators.pattern("^[0-9]*$")]),
    dimmension: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    balcony: new FormControl('true'),
    privateBathroom: new FormControl('true'),
    airConditioning: new FormControl('true'),
    freeParking: new FormControl('true'),
    breakfastIncluded: new FormControl('true'),
    petsAllowed: new FormControl('true'),
    distanceFromCenter: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    imagesPaths: new FormControl('')
  });

  myFiles: any = [];

  get form() {
    return this.propertyForm.controls;
  }

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      let n = files.length;
      for(var i = 0; i < n; i++) {
        this.myFiles.push(files[i]);
      }
    }
  }

  addProperty(): void {
    const name = this.propertyForm.value.name;
    const description = this.propertyForm.value.description;
    const address = this.propertyForm.value.address;
    const country = this.propertyForm.value.country;
    const city = this.propertyForm.value.city;
    const pricePerNight = this.propertyForm.value.pricePerNight;
    const adultsNumber = this.propertyForm.value.adultsNumber;
    const roomsNumber = this.propertyForm.value.roomsNumber;
    const dimmension = this.propertyForm.value.dimmension;
    let balcony = this.propertyForm.value.balcony;
    let privateBathroom = this.propertyForm.value.privateBathroom;
    let airConditioning = this.propertyForm.value.airConditioning;
    let freeParking = this.propertyForm.value.freeParking;
    let breakfastIncluded = this.propertyForm.value.breakfastIncluded;
    let petsAllowed = this.propertyForm.value.petsAllowed;
    const distanceFromCenter = parseInt(this.propertyForm.value.distanceFromCenter);
    let imagesPaths: any = [];

    let that = this;
    this.myFiles.forEach(function(item: any, index: any) {
      imagesPaths.push(item.name);
      const ref = that.storage.ref(item.name);
      const task = ref.put(item);
    })
    
    this.http.post<any>('/api/properties', {
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
