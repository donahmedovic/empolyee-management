import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  pageTitle = 'employee-details';
  employee:Employee|undefined;
  errorMessage: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService:EmployeeService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param; 
    this.employeeService.getEmployee(id).subscribe({
      next: (employee: Employee) =>this.employee= employee,
      error: err => this.errorMessage = err
    });
  }

  }
  onBack(): void {
    this.router.navigate(['/employees']);
  }
}
