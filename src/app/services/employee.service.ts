import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'api/employees';

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
   
    // return this.allEmployee;
  }
  addEmpoyee(employee: Employee) {
    
    //this.allEmployee.push(employee);
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
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  allEmployee = [{
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
}
