import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  allEmployee: Employee[] = [{
    id: 1,
    age: 55,
    firstName: "ahmed",
    lastName: "sharkawy",
    designation: "Associate Lead, Technology"
  }, {
    id: 2,
    age: 35,
    firstName: "fady",
    lastName: "lotfy",
    designation: "Associate Senior, Technology"
  }, {
    id: 3,
    age: 25,
    firstName: "sara",
    lastName: "soliman",
    designation: "Recruitment specialist, HR"
  },];


  getAllEmployee(): Employee[] {
    return this.allEmployee;
  }
  addEmpoyee(employee: Employee) {
    this.allEmployee.push(employee);
  }
  updateEmployee(employee: Employee) {
    let updatedEmp = this.allEmployee.find(emp => emp.id == employee.id);
    updatedEmp = { ...employee };
  }
  deleteEmployee(id:number){
    let deletedEmp = this.allEmployee.find(emp => emp.id == id);
    this.allEmployee= this.allEmployee.filter(emp=>emp.id!=id)
  }
  getEmployee(id:number): Employee {
    return this.allEmployee.find(emp => emp.id == id);
  }
}
