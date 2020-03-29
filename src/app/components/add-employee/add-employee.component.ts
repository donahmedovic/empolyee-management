import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormControlName } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { NumberValidators } from 'src/app/shared/NumberValidator';
import { GenericValidator } from '../../shared/generic-validator' ;
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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


  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {


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
  saveEmployee(): void {
    if (this.employeeForm.valid) {
      if (this.employeeForm.dirty) {
        console.log(this.employeeForm.value)
      }
    }
  }
  deleteEmployee(): void {
    alert("Employee is deleted")
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

}
