import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AddEmployeeComponent } from '../components/add-employee/add-employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEditGuard implements CanDeactivate<AddEmployeeComponent> {
  canDeactivate(component: AddEmployeeComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.employeeForm.dirty) {
      const FullName = component.employeeForm.get('name').value || 'New employee';
      return confirm(`Navigate away and lose all changes to ${FullName}?`);
    }
    return true;
  }
}
