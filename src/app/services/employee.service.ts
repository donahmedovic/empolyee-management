import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'http://localhost:4000/api';
  private headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
   
    // return this.allEmployee;
  }
  addEmpoyee(employee: Employee): Observable<Employee> {
    employee._id=null;
    let url = `${this.employeesUrl}/create`;
    return this.http.post<Employee>(url ,employee).pipe(
      tap(data => console.log('createEmployee: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
    //this.allEmployee.push(employee);
  }
  // updateEmployee(employee: Employee) {
  //   let updatedEmp = this.allEmployees.find(emp => emp._id == employee._id);
  //   updatedEmp = { ...employee };
  // }
  updateEmployee(employee: Employee): Observable<any> {
    let url = `${this.employeesUrl}/update/${employee._id}`;
    return this.http.put(url, employee, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  
  deleteEmployee(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }
  getEmployee(id:string): Observable<Employee> {
    if (id ==="null") {
      return of(this.initializeEmployee());
    }
    const url = `${this.employeesUrl}/read/${id}`;
    return this.http.get<Employee>( url ).pipe(
      tap(data=>console.log(JSON.stringify(data))),catchError(this.handleError));
  }
  // verifyEmployeeEmail(email:string): Observable<Boolean> {
  //   const url = `${this.employeesUrl}/${email}`;
  //   return this.http.get<Employee>( url ).pipe(
  //     tap(data=>return data.email==email),catchError(this.handleError));
  // }

  initializeEmployee(): Employee {
    return {_id:null,age:null,email:null,designation:null,name:null,mobile:null};
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
   allEmployees = [{
    id: 1,
    age: 55,
    email:'a.sharkawy@aot.com',
    firstName: "ahmed",
    lastName: "sharkawy",
    designation: "Associate Lead, Technology"
  }, {
    id: 2,
    age: 35,
    email:'f.lotfy@aot.com',
    firstName: "fady",
    lastName: "lotfy",
    designation: "Associate Senior, Technology"
  }, {
    id: 3,
    age: 25,
    email:'s.soliman@aot.com',
    firstName: "sara",
    lastName: "soliman",
    designation: "Recruitment specialist, HR"
  },
  {
    id: 4,
    age: 29,
    email:'a.Gamal@aot.com',
    firstName: "Ali",
    lastName: "Gamal",
    designation: "Team Lead, UI"
  }, {
    id: 5,
    age: 31,
    email:'s.Saad@aot.com',
    firstName: "Sohaib",
    lastName: "Saad",
    designation: "Senior IOS, Mobile"
  },{
    id: 6,
    age: 34,
    email:'m.monir@aot.com',
    firstName: "Mahmoud",
    lastName: "monir",
    designation: "Senior Android, Mobile"
  }];
}
