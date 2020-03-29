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
  employeeList:Employee[]=[];
  FiltereEmployeeList:Employee[]=[];


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.FiltereEmployeeList = this.listFilter ? this.performFilter(this.listFilter) : this.employeeList;
  }

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe({next:employees=>{
    this.employeeList=employees;
    this.FiltereEmployeeList=this.employeeList;
    }});
  }
  performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employeeList.filter((employee: Employee) =>
    employee.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
