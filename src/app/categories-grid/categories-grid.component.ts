import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { categoryListMock } from '../devices-grid/mock/data';

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

  constructor(private _router: Router, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.checkTheCurrentRoute();
    try {
      this.categoryList = await this.retrieveCategories();
      this.hasData = this.isEmpty(this.categoryList);
    } catch (err: any) {
      console.error(err);
      this.sendMessageToParent(err.message);
    }
  }

  retrieveCategories(): Promise<Array<Category>> {
    this.hasData = false;
    this.isRequestDone = false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isRequestDone = true;
        resolve(categoryListMock);
      }, 3000);
    });
  }

  async openForm(): Promise<void> {
    this.dialog.open(FormCategoryComponent)
      .afterClosed().subscribe(async result => {
        if (result) {
          await this.retrieveCategories();
          this.hasData = this.isEmpty(this.categoryList);
          this.categoryList.push(<Category> {
            id: this.categoryList.length + 1,
            name: result.name
          });
        }
      });
  }

  deleteDevice(id: number): void {
    let categoryIndex = this.categoryList.findIndex(category => category.id === id);
    this.categoryList.splice(categoryIndex, 1);
    this.sendMessageToParent(`Category #${id} deleted successfully.`)
  }

  checkTheCurrentRoute(): void {
    if (this._router.url === '/category-management')
      this.isCategoryManagementRoute = true;
  }

  isEmpty(data: Array<any>): boolean {
    return data.length > 0;
  }

  sendMessageToParent(value: string) {
    this.messageEmitter.emit(value);
  }
}
