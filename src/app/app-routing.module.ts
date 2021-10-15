import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceManagementComponent } from './device-management/device-management.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'device-management', component: DeviceManagementComponent },
  { path: 'category-management', component: CategoryManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent, DeviceManagementComponent, CategoryManagementComponent];
