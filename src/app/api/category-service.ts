import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../devices-grid/mock/data";

const BASE_URL = 'http://18.229.255.97:3000/api/categories';

@Injectable()
@NgModule()
export class CategoryService {

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(BASE_URL);
  }

  createNewCategory(categoryName: string): Observable<Category> {
    return this.http.post<Category>(BASE_URL, { name: categoryName });
  }

  deleteCategory(categoryId: number): Observable<any> {
    const url = `${BASE_URL}/${categoryId}`;
    return this.http.delete(url);
  }
}