import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationService {

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return this.http.get('/api/admin/admin-check-authentication');
  }
}
