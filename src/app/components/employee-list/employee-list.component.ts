import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  pageTitle = 'employee-List';
  employeeList:Employee[];

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeList=this.employeeService.getAllEmployee();
  }

}
