import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { RoleGuard } from '../auth/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
  },
  { path: 'new', component: CourseFormComponent },
  { path: ':id/edit', component: CourseFormComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
