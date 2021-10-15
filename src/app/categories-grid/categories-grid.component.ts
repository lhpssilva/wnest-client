import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { categoryListMock } from '../devices-grid/mock/data';
import { CategoryService } from '../api/category-service';

interface Category {
  id: number,
  name: string
}

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.css']
})
export class CategoriesGridComponent implements OnInit {
  @Output() messageEmitter: EventEmitter<string> = new EventEmitter<string>();

  categoryList: Array<Category> = [];
  isCategoryManagementRoute: boolean = false;
  hasData: boolean = false;
  isRequestDone: boolean = false;

  constructor(private _router: Router, public dialog: MatDialog, private categoryService: CategoryService) { }

  async ngOnInit(): Promise<void> {
    this.checkTheCurrentRoute();
    try {
      this.retrieveCategories();
    } catch (err: any) {
      console.error(err);
      this.sendMessageToParent(err.message);
    }
  }

  retrieveCategories(): void {
    this.hasData = false;
    this.isRequestDone = false;

    this.categoryService.getAllCategories()
      .subscribe((data: Array<Category>) => {
        this.isRequestDone = true;
        this.hasData = this.isNotEmpty(data);
        this.categoryList = data;
        console.log(this.categoryList)
      });
  }

  async openForm(): Promise<void> {
    this.dialog.open(FormCategoryComponent)
      .afterClosed().subscribe(result => {
        if (result) {
          this.retrieveCategories();
          this.sendMessageToParent(`New category created successfully.`);
        }
      });
  }

  deleteDevice(id: number): void {
    this.categoryService.deleteCategory(id)
      .subscribe(() => {
        this.sendMessageToParent(`Device #${id} deleted successfully.`);
        let deviceIndex = this.categoryList.findIndex(device => device.id === id);
        this.categoryList.splice(deviceIndex, 1);
      });
  }

  checkTheCurrentRoute(): void {
    if (this._router.url === '/category-management')
      this.isCategoryManagementRoute = true;
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
