import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Property } from '../property';
import { PropertyService } from '../property/property.service';

import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  property!: Property;
  imageObject: any = [];
  
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getPropertyDetail();
  }

  getPropertyDetail(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyDetail(_id)
    .subscribe(property =>  {
      let that = this;
      let imagesUrls: any = [];

      property.imagesPaths.forEach(function(item, index) {
        const ref = that.storage.ref(item);
        let imageUrl = ref.getDownloadURL()
        .subscribe(url => {
          if (url) {
            imagesUrls.push(url);
            that.imageObject.push({
              image: url,
              thumbImage: url
            })
          }
        });
      })

      property.imagesPaths = imagesUrls;
      this.property = property;
    }); 
  }

}
