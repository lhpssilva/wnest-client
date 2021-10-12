import { Component } from '@angular/core';

interface SideNavItem {
  linkValue: string,
  iconName: string,
  title: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WNest';
  sideNavItems: Array<SideNavItem> = [
    { linkValue: '/', iconName: 'home', title: 'Home' },
    { linkValue: '/device-management', iconName: 'devices_other', title: 'Device Management' },
    { linkValue: '/category-management', iconName: 'all_inclusive', title: 'Category Management' }
  ];
  isExpanded: boolean = false;

  expandSideNave(): void {
    this.isExpanded = !this.isExpanded;
  }
}
