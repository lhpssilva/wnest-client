import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "../devices-grid/mock/data";

const BASE_URL = 'http://18.229.255.97:3000/api/devices';

@Injectable()
@NgModule()
export class DeviceService {

  constructor(private http: HttpClient) {}

  getAllDevices(): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(BASE_URL);
  }

  createNewDevice(deviceParam: any): Observable<Device> {
    return this.http.post<Device>(BASE_URL, deviceParam);
  }

  deleteDevice(deviceId: number): Observable<any> {
    const url = `${BASE_URL}/${deviceId}`;
    return this.http.delete(url);
  }
}