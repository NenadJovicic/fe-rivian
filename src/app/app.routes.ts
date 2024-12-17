import { Routes } from '@angular/router';
import { ChargingComponent } from './charging/charging.component';
import { LoginComponent } from './login/login.component';
import { isLoggedInGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    component: ChargingComponent,
    canActivate: [isLoggedInGuard],
  },
];
