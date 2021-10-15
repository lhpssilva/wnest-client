import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface CategoryDialogData {
  name: string
}

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {
  categoryDialogTitle: string = 'Add New Category';
  categoryFormFields = { name: new FormControl('', { validators: [Validators.required] })};
  categoryForm: FormGroup = new FormGroup(this.categoryFormFields);
  showCategoryHint: boolean = false;
  formFieldControls: any;

  constructor(public dialogRef: MatDialogRef<FormCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryDialogData) {
    }

  ngOnInit(): void {}

  submitNewCategory(): void {
    this.formFieldControls = {...this.categoryForm.controls };

    if (this.formFieldControls.name.status === 'INVALID') {
      this.showCategoryHint = true;
    } else {
      this.data = { name: this.formFieldControls.name.value };
      console.log(this.data)
      this.dialogRef.close(this.data);
    }
  }
}
