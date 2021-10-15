import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../api/category-service';
import { DeviceService } from '../api/device-service';
import { FormComponent } from '../form/form.component';
import { Device, Category, categoryListMock } from './mock/data';

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

  constructor(private _router: Router,
    public dialog: MatDialog,
    private deviceService: DeviceService,
    private categoryService: CategoryService) { }

  async ngOnInit(): Promise<void> {
    this.checkTheCurrentRoute();
    try {
      if (this.isDeviceManagementRoute) {
        this.retrieveCategories();
      }
      this.retrieveDevices();
    } catch (err: any) {
      console.error(err);
      this.sendMessageToParent(err.message);
    }
  }

  retrieveDevices(): void{
    this.hasData = false;
    this.isRequestDone = false;
    
    try {
    this.deviceService.getAllDevices()
      .subscribe((data: Array<Device>) => {
        this.isRequestDone = true;
        this.hasData = this.isNotEmpty(data);
        this.deviceList = data;
        console.log(this.deviceList)
      });
    } catch (err: any) {
      console.error(err.error);
    }
  }

  retrieveCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe((data: Array<Category>) => {
        this.categoryList = data;
        console.log(this.categoryList)
      });
  }

  async openForm(): Promise<void> {
    this.dialog.open(FormComponent, { data: { categories: this.categoryList }})
      .afterClosed().subscribe(result => {
        if (result) {
          this.retrieveDevices();
          this.sendMessageToParent(`New device created successfully.`);
        }
      });
  }

  deleteDevice(id: number): void {
    this.deviceService.deleteDevice(id)
      .subscribe(() => {
        this.sendMessageToParent(`Device #${id} deleted successfully.`);
        let deviceIndex = this.deviceList.findIndex(device => device.id === id);
        this.deviceList.splice(deviceIndex, 1);
      });
  }

  checkTheCurrentRoute(): void {
    if (this._router.url === '/device-management')
      this.isDeviceManagementRoute = true;
  }

  isNotEmpty(data: Array<any>): boolean {
    if (data !== null && data.length > 0) {
      return true;
    }
    return false;
  }

  sendMessageToParent(value: string) {
    this.messageEmitter.emit(value);
  }
}
