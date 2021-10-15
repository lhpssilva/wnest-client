import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.css']
})
export class DeviceManagementComponent implements OnInit {
  routeTitle: string = 'Device Management';
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  openSnackbar(message: string): void {
    this._snackBar.open(message, 'close', { duration: 5000 });
  }
}
