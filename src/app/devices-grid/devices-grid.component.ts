import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { Device, Category, deviceListMock, categoryListMock } from './mock/data';

@Component({
  selector: 'app-devices-grid',
  templateUrl: './devices-grid.component.html',
  styleUrls: ['./devices-grid.component.css']
})
export class DevicesGridComponent implements OnInit {
  @Output() messageEmitter: EventEmitter<string> = new EventEmitter<string>()
  deviceList: Array<Device> = [];
  categoryList: Array<Category> = [];
  isRequestDone: boolean = false;
  hasData: boolean = false;
  isDeviceManagementRoute: boolean = false;

  constructor(private _router: Router, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.checkTheCurrentRoute();
    try {
      if (this.isDeviceManagementRoute) {
        this.categoryList = await this.retrieveCategories();
      }
      this.deviceList = await this.retrieveDevices();
      this.hasData = this.isEmpty(this.deviceList);
    } catch (err: any) {
      console.error(err);
      this.sendMessageToParent(err.message);
    }
  }

  retrieveDevices(): Promise<Array<Device>> {
    this.hasData = false;
    this.isRequestDone = false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isRequestDone = true;
        // reject(new Error('Something went wrong.'));
        resolve(deviceListMock);
      }, 3000);
    });
  }

  retrieveCategories(): Promise<Array<Category>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(categoryListMock);
      }, 3000);
    });
  }

  async openForm(): Promise<void> {
    this.dialog.open(FormComponent, { data: { categories: this.categoryList }})
      .afterClosed().subscribe(async result => {
        if (result) {
          await this.retrieveDevices();
          this.hasData = this.isEmpty(this.deviceList);
          this.deviceList.push(<Device> {
            id: this.deviceList.length + 1,
            category: result.categories,
            color: result.color,
            partNumber: result.partNumber
          });
        }
      });
  }

  addNewDevice(): void {
    let newDevice: Device = {
      id: this.deviceList.length + 1,
      category: 'SmartTv',
      color: 'white',
      partNumber: 1
    };

    this.deviceList.push(newDevice);
    this.sendMessageToParent(`Device #${newDevice.id} added successfully.`);
  }

  deleteDevice(id: number): void {
    let deviceIndex = this.deviceList.findIndex(device => device.id === id);
    this.deviceList.splice(deviceIndex, 1);
    this.sendMessageToParent(`Device #${id} deleted successfully.`)
  }

  checkTheCurrentRoute(): void {
    if (this._router.url === '/device-management')
      this.isDeviceManagementRoute = true;
  }

  isEmpty(data: Array<any>): boolean {
    return data.length > 0;
  }

  sendMessageToParent(value: string) {
    this.messageEmitter.emit(value);
  }
}
