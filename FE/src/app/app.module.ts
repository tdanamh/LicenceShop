import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { BookPropertyComponent } from './book-property/book-property.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogEditPropertyComponent } from './dialog-edit-property/dialog-edit-property.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DialogNewPropertyComponent } from './dialog-new-property/dialog-new-property.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { NgImageSliderModule } from 'ng-image-slider';

export function tokenGetter() {
  return localStorage.getItem('AUTH');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AccountComponent,
    NavbarComponent,
    PropertiesComponent,
    LoginComponent,
    PropertyDetailComponent,
    BookPropertyComponent,
    RegisterComponent,
    AdminLoginComponent,
    AdminComponent,
    DialogEditPropertyComponent,
    ResetPasswordComponent,
    DialogNewPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      }
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    NgImageSliderModule,
    MatListModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: BUCKET, useValue: "renting-53ec3.appspot.com" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
