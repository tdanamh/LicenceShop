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

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties()
    .subscribe(properties => {
      this.properties = properties
    });
  }
}
