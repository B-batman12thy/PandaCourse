import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCatalogComponent } from './course-catalog/course-catalog.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursePlayerComponent } from './course-player/course-player.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: CourseCatalogComponent },
  {
    path: ':id/player',
    component: CoursePlayerComponent,
    canActivate: [AuthGuard],
  },
  { path: ':id', component: CourseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
