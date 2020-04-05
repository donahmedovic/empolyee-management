import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, PatternValidator, FormControl, FormArray, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { NumberValidators } from 'src/app/shared/NumberValidator';
import { GenericValidator } from '../../shared/generic-validator';
import { Observable, Subscription, fromEvent, merge, Observer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = "Add Employee"
  errorMessage: string;
  employeeForm: FormGroup;
  displayMessage: { [key: string]: string } = {};

  // myObservable = Observable.create((observer:Observer<number>)=>{return [1,2,3]})
  // // Create observer object
  // const myObserver = {
  //   next: x => console.log('Observer got a next value: ' + x),
  //   error: err => console.error('Observer got an error: ' + err),
  //   complete: () => console.log('Observer got a complete notification'),
  // };
  // myObservable.subscribe(myObserver);

  // Execute with the observer object

  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };
  employee: Employee;
  sub: Subscription;


  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.validationMessages = {
      name: {
        required: 'full name is required.',
        minlength: 'full name must be at least three characters.',
        maxlength: 'full name cannot exceed 50 characters.'
      },
      email: {
        required: 'last name   is required.',
        pattern: 'email must be examble@domain.ex.'
      },
      mobile: {
        required: 'last name   is required.',
        pattern: '00966xxxxxxxxx  ex: 14 idgit.'
      },
      age: {
        required: 'age is required.',
        range: 'employee age between 20 (lowest) and 65 (highest).'
      }, designation: {
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

    if (this.employee._id === null) {
      this.pageTitle = 'Add Employee';
    } else {
      this.pageTitle = `Edit Employee : ${this.employee.name}`;
      this.employeeForm.updateValueAndValidity();
    }
    console.log(this.pageTitle)
    this.employeeForm.patchValue({
      name: this.employee.name,
      email: this.employee.email,
      mobile: this.employee.mobile,
      age: this.employee.age,
      designation: this.employee.designation
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    console.log("destroy")
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      email: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$/)]],
      mobile: ['', [Validators.required,
      Validators.pattern(/(00966\d{9})+$/)]],
      age: ['', [Validators.required, NumberValidators.range(20, 65)]],
      designation: ['', [Validators.required]]
    });
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getEmployee(id);
      }
    );
  }

  getEmployee(id: string): void {
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

        if (p._id === null) {
          this.employeeService.addEmpoyee(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.employeeService.updateEmployee(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
          console.log(this.employeeForm.value);
        }

      }
    }
  }

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employee._id)
      .subscribe({
        next: () => this.onSaveComplete(),
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
    // this.router.navigate(['/employees']);
    this.ngZone.run(() =>this.router.navigate(['/employees']))
  }
}
