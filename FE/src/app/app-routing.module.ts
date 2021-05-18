import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateGuard } from './authenticate.guard';
import { AdminAuthenticateGuard } from './admin-authenticate.guard';

import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { BookPropertyComponent } from './book-property/book-property.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthenticateGuard] },
  { path: 'properties', component: PropertiesComponent },
  { path: 'properties/:id', component: PropertyDetailComponent },
  { path: 'bookProperty/:propertyId', component: BookPropertyComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminAuthenticateGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
