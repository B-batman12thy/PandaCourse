// src/app/admin/admin-routing.module.ts
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourseListComponent }     from './course-list/course-list.component';
import { CourseFormComponent }     from './course-form/course-form.component';
import { AuthGuard }               from '../auth/auth.guard';
import { RoleGuard }               from '../auth/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    children: [
      // redirige automatiquement /admin → /admin/courses
      { path: '',                 redirectTo: 'courses',   pathMatch: 'full' },
      { path: 'courses',          component: CourseListComponent },
      { path: 'courses/new',      component: CourseFormComponent },
      { path: 'courses/:id/edit', component: CourseFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
