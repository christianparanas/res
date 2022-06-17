import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService as AuthGuard } from './services/auth.service';

import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/admin/auth/auth.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/auth', component: AuthComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
