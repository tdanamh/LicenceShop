import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Property } from '../property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('/api/properties');
  }

  getPropertyDetail(_id: any): Observable<Property> {
    // TODO:  Check if id exists
    return this.http.get<Property>('/api/properties/' + _id)
  }
}
