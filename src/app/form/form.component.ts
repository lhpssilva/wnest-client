import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceService } from '../api/device-service';
import { Category, Device } from '../devices-grid/mock/data';

interface DialogData {
  categoryId: number,
  color: string,
  partNumber: number,
  categories: Array<Category>
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  deviceFormFields = {
    category: new FormControl('', { validators: [Validators.required] }),
    color: new FormControl('', { validators: [Validators.required, Validators.maxLength(16)] }),
    partNumber: new FormControl('', { validators: [Validators.required, Validators.min(1)] })
  };
  deviceForm: FormGroup = new FormGroup(this.deviceFormFields);
  categoryList: Array<Category> = [];
  isCategoryFieldDisabled: boolean = false;
  fieldsValues!: any;
  showCategoryHint: boolean = false;
  showColorHint: boolean = false;
  showPartNumberHint: boolean = false;

  constructor(public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private deviceService: DeviceService) {}

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.categories !== null) {
      this.categoryList = this.data.categories;
    }

    this.isCategoryFieldDisabled = this.categoryList.length === 0;
    if (this.isCategoryFieldDisabled) {
      this.showCategoryHint = true;
    }
  }

  submitNewDevice() {
    this.fieldsValues = {...this.deviceForm.controls };
    if (this.deviceForm.status === 'INVALID') {
      if (this.fieldsValues.category.value === '') {
        this.showCategoryHint = true;
      } else {
        this.showCategoryHint = false;
      }

      if (this.fieldsValues.color.value === '') {
        this.showColorHint = true;
      } else {
        this.showColorHint = false;
      }

      if (this.fieldsValues.partNumber.value === '') {
        this.showPartNumberHint = true;
      }else {
        this.showPartNumberHint = false;
      }
    } else {
      this.data = {
        categoryId: Number.parseInt(this.fieldsValues.category.value),
        color: this.fieldsValues.color.value,
        partNumber: this.fieldsValues.partNumber.value,
        categories: []
      };
      this.deviceService.createNewDevice({
        categoryId: Number.parseInt(this.fieldsValues.category.value),
        color: this.fieldsValues.color.value,
        partNumber: this.fieldsValues.partNumber.value
      }).subscribe((data: any) => {
        this.dialogRef.close(data);
      })
    }
  }
}
