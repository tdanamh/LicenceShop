import { Component, OnInit } from '@angular/core';

import { Property } from '../property';
import { PropertyService } from '../property/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];

  filters: any = []

  reloadProducts(e: any) {
    let filterName = e.target.value.split('=')[0]
    let filterValue = e.target.value.split('=')[1]

    this.filters[filterName] = filterValue

    this.getProperties();
  }

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    let that = this;

    this.propertyService.getProperties()
    .subscribe(properties => {
      properties.forEach(function(property, index) {
        if (that.filters['airConditioning']) {
          let isACtrue = (that.filters['airConditioning'] === 'true')
          properties = properties.filter(property => property.airConditioning == isACtrue)
        }
        if (that.filters['balcony']) {
          let isBalconyTrue = (that.filters['balcony'] === 'true')
          properties = properties.filter(property => property.balcony == isBalconyTrue)
        }
        if (that.filters['privateBathroom']) {
          let isBathroomTrue = (that.filters['privateBathroom'] === 'true')
          properties = properties.filter(property => property.privateBathroom == isBathroomTrue)
        }
        if (that.filters['freeParking']) {
          let isParkingTrue = (that.filters['freeParking'] === 'true')
          properties = properties.filter(property => property.freeParking == isParkingTrue)
        }
        if (that.filters['breakfastIncluded']) {
          let isBreakfastTrue = (that.filters['breakfastIncluded'] === 'true')
          properties = properties.filter(property => property.breakfastIncluded == isBreakfastTrue)
        }
        // Filter rooms number, adults number
        // Filter by city
      })
      this.properties = properties;
    });
  }
}
