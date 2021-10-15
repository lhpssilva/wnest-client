import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  routeTitle: string = 'Category Management';
  
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackbar(message: string) {
    this._snackBar.open(message, 'close', { duration: 5000 });
  }
}
