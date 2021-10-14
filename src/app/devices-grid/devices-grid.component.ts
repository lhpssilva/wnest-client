import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Device, deviceListMock } from './mock/data';

@Component({
  selector: 'app-devices-grid',
  templateUrl: './devices-grid.component.html',
  styleUrls: ['./devices-grid.component.css']
})
export class DevicesGridComponent implements OnInit {
  @Output() messageEmitter: EventEmitter<string> = new EventEmitter<string>()
  deviceList: Array<Device> = [];
  isRequestDone: boolean = false;
  hasData: boolean = false;
  isDeviceManagementRoute: boolean = false;

  constructor(private _router: Router) { }

  async ngOnInit(): Promise<void> {
    this.checkTheCurrentRoute();
    try {
      this.deviceList = await this.retrieveDevices();
      this.hasData = this.isEmpty(this.deviceList);
    } catch (err: any) {
      console.error(err);
      this.sendMessageToParent(err.message);
    }
  }

  retrieveDevices(): Promise<Array<Device>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isRequestDone = true;
        // reject(new Error('Something went wrong.'));
        resolve(deviceListMock);
      }, 3000);
    });
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
