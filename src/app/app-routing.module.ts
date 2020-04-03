import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AppComponent } from './app.component';
import { EmployeeEditGuard } from './shared/employee-edit.guard';


const routes: Routes = [
  { path: 'welcome', component: AppComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id/edit',canDeactivate:[EmployeeEditGuard], component: AddEmployeeComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: '**', redirectTo: 'employees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
