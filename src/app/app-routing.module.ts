import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceManagementComponent } from './device-management/device-management.component';

const routes: Routes = [
  { path: 'device-management', component: DeviceManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DeviceManagementComponent];
