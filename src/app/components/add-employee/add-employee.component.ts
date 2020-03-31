import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { NumberValidators } from 'src/app/shared/NumberValidator';
import { GenericValidator } from '../../shared/generic-validator' ;
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit , AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = "Add Employee"
  errorMessage: string;
  employeeForm: FormGroup;
  displayMessage: { [key: string]: string } = {};

  private genericValidator:GenericValidator ;
  private validationMessages: { [key: string]: { [key: string]: string } };
  employee: Employee;


  constructor(private fb: FormBuilder, 
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,

    ) {


    this.validationMessages = {
      firstName: {
        required: 'first name is required.',
        minlength: 'first name must be at least three characters.',
        maxlength: 'first name cannot exceed 50 characters.'
      },
      lastName: {
        required: 'last name   is required.',
        minlength: 'last name must be at least 3 characters.',
        maxlength: 'last name cannot exceed 15 characters.'
      },
      age: {
        required: 'age is required.',
        range: 'employee age between 20 (lowest) and 65 (highest).'
      },designation:{
        required: 'designation  is required.',
        
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
   }

   displayProduct(employee: Employee): void {
    if (this.employeeForm) {
      this.employeeForm.reset();
    }
    this.employee = employee;

    if (this.employee.id === 0) {
      this.pageTitle = 'Add Employee';
    } else {
      this.pageTitle = `Edit Employee : ${this.employee.firstName}`;
    }
    this.employeeForm.patchValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      age: this.employee.age,
      designation: this.employee.designation
    });
  }
  ngOnDestroy(): void {
    console.log("destroy")
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],
      lastName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],
      age: ['',[Validators.required , NumberValidators.range(20, 65)]],
      designation: ['', [Validators.required]]
    });
  }

  getEmployee(id: number): void {
    this.employeeService.getEmployee(id)
      .subscribe({
        next: (employee: Employee) => this.displayProduct(employee),
        error: err => this.errorMessage = err
      });
  }
  saveEmployee(): void {
    if (this.employeeForm.valid) {
      if (this.employeeForm.dirty) {
        const p = { ...this.employee, ...this.employeeForm.value };

        if (p.id === 0) {console.log(this.employeeForm.value)}
          this.employeeService.addEmpoyee(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
          
        
      }
    }
  }

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employee.id)
            .subscribe({next:()=>this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
  }
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.employeeForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.employeeForm);
    });
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.employeeForm.reset();
    this.router.navigate(['/employees']);
  }

}
