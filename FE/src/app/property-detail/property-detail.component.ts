import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Property } from '../property';
import { PropertyService } from '../property/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  property!: Property;
  
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
  ) {}

  ngOnInit(): void {
    this.getPropertyDetail();
  }

  getPropertyDetail(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyDetail(_id)
    .subscribe(property => this.property = property);
  }

}
