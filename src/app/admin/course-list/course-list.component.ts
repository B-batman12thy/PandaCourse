import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Course } from '../../shared/models/course.model';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private toasts = inject(ToastService);

  courses: Course[] = [];
  pagedCourses: Course[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  pages: number[] = [];

  ngOnInit() {
    this.api.getCourses().subscribe((cs: Course[]) => {
      this.courses = cs;
      this.totalPages = Math.ceil(cs.length / this.pageSize);
      this.updatePagedCourses();
    });
  }

  private updatePagedCourses() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedCourses = this.courses.slice(start, start + this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedCourses();
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedCourses();
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedCourses();
    }
  }

  edit(id: string) {
    this.router.navigate(['/admin/courses', id, 'edit']);
  }

  remove(id: string) {
    if (!confirm('Supprimer ce cours ?')) return;
    this.api.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter((c) => c.id !== id);
        this.updatePagedCourses();
        this.toasts.show('Cours supprimé !', 'success');
      },
      error: () => this.toasts.show('Erreur lors de la suppression', 'error'),
    });
  }

  newCourse() {
    this.router.navigate(['/admin/courses/new']);
  }
}
