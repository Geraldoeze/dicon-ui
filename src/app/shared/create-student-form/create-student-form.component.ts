import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import { MessageService } from 'primeng/api';


interface Warehouse {
  id: string;
  name: string;
  address: string;
  productCount: string;
  itemCount: string;
}

@Component({
  selector: 'app-create-student-form',
  templateUrl: './create-student-form.component.html',
  styleUrl: './create-student-form.component.scss',
  providers: [MessageService]  // for PrimeNG messages
})
export class CreateStudentFormComponent implements OnInit {
  @Input() wareHouses!: any;
  @Input() vendors!: any;
  @Input() units!: any;
  @Input() loading = false;
  @Output() togleModal = new EventEmitter<string>();
  @Output() saveProduct = new EventEmitter<string>();

  createProductForm:any;
  isSubmitted = false;
  files:any;
  imageSrc:any;
  accommodationImageSrc:any;
  viewImages=false;
  genders: any = ['Male', 'Female'];
  courses: any = ['Mathematics', 'Science', 'English', 'Social Studies', 'History', 'Geography'];
  batches: any = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4', 'Batch 5'];



  constructor(private fb:FormBuilder,
              private api:HttpServiceService,
              private messageService: MessageService){}


  ngOnInit(){
    this.createProductForm = this.fb.group({
      // Basic information
      productName: ['', Validators.required],
      warehouse: ['', Validators.required],
      vendor: ['', Validators.required],
      code: [''],
      sku: ['', Validators.required],
      image: ['', Validators.required],
      barcode: [''],

      // Sales information
      price: ['', [Validators.required, Validators.min(0)]],

      // Inventory
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
    });

    this.getWarehouses()
    this.getVendors()
    this.getUnits()
  }

  toggleCreateProduct(){
    this.togleModal.emit()
  }


  get f() {
    return this.createProductForm.controls;
  }


  getWarehouses(){
    this.api.get('warehouses').subscribe(
      res=>{
        console.log('getting warhouses');
        this.wareHouses = res
        this.wareHouses = this.wareHouses.data
        console.log(this.wareHouses)
      }
    )
  }

  getVendors(){
    this.api.get('vendors').subscribe(
      res=>{
        this.vendors = res
        console.log(this.vendors)
        // this.vendors = this.wareHouses.data
      }
    )
  }

  getUnits(){
    this.api.get('units').subscribe(
      res=>{
        this.units = res
        console.log(this.vendors)
      }
    )
  }

  save() {
    this.isSubmitted = true;

    console.log(this.createProductForm.value);

    const formData:any = new FormData();
    this.showSuccess('Student created successfully')

    // Append each file in the files array to FormData
    // this.files.forEach((file: any) => {
    //   formData.append(`media[]`, file, file.name);  // Append each file with the key media[]
    // });

    // Append other form data
    // formData.append('name', this.createProductForm.get('productName')?.value);
    // formData.append('location', this.createProductForm.get('warehouse')?.value);
    // formData.append('vendor', this.createProductForm.get('vendor')?.value);
    // formData.append('code', this.createProductForm.get('code')?.value);
    // formData.append('sku', this.createProductForm.get('sku')?.value);
    // formData.append('barcode', this.createProductForm.get('barcode')?.value);
    // formData.append('price', this.createProductForm.get('price')?.value);
    // formData.append('unit', this.createProductForm.get('unit')?.value);
    // formData.append('quantity', this.createProductForm.get('quantity')?.value);

    // if (this.createProductForm.invalid) {
    //   console.log("form invalid");
    //   return;
    // }

    // this.api.post('products', formData).subscribe(
    //   res => {
    //     console.log(res);
    //     this.showSuccess('Product created successfully');
    //     this.createProductForm.reset();
    //   },
    //   err => {
    //     console.log(err);
    //     this.showError('Failed to create product, please try again');
    //   }
    // );
  }


  onFileSelected(event: any): void {
    console.log('selection function hit');

    // Store all selected files
    this.files = Array.from(event.target.files);  // Converts FileList to an array of files

    console.log(this.files);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
