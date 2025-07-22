import { Component, OnInit } from '@angular/core';
import { Router, RouterModule }            from '@angular/router';
import { ApiService }        from '../../core/api/api.service';
import { Course }            from '../../shared/models/course.model';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  imports: [CommonModule, RouterModule],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  pagedCourses: Course[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  pages: number[] = [];

  constructor(private api: ApiService, private router: Router,private toasts: ToastService) {}

  ngOnInit() {
    this.api.getCourses()
    .subscribe((cs: Course[]) => {            // ← on indique explicitement Course[]
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
    // on passe l'id tel quel
    this.router.navigate(['/admin/courses', id, 'edit']);
  }

  remove(id: string) {
    if (!confirm('Supprimer ce cours ?')) return;
    this.api.deleteCourse(id).subscribe({
      next: () => {
        // enlève le cours en local (et remonte la pagination)
        this.courses = this.courses.filter(c => c.id !== id);
        this.updatePagedCourses();
        this.toasts.show('Cours supprimé !', 'success');
      },
      error: () => this.toasts.show('Erreur lors de la suppression', 'error')
    });
  }
  newCourse() {
    this.router.navigate(['/admin/courses/new']);
  }
  
}
