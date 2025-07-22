import { Component, OnInit }     from '@angular/core';
import { Router, RouterModule }          from '@angular/router';
import { CommonModule }          from '@angular/common';
import { ApiService }            from '../../core/api/api.service';
import { Course }                from '../../shared/models/course.model';
import { FormsModule }           from '@angular/forms';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-catalog.component.html',
})
export class CourseCatalogComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  pagedCourses: Course[] = [];
  searchTerm: string = '';

  currentPage = 1;
  pageSize = 6;
  totalPages = 0;
  pages: number[] = [];

  constructor(private api: ApiService, private router: Router  ) {}

  ngOnInit() {
    this.api.getCourses().subscribe(cs => {
      this.courses = cs;
      this.applyFilter();
    });
  }

  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredCourses = term
      ? this.courses.filter(c =>
          c.title.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term)
        )
      : [...this.courses];

    // recalcul pagination
    this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagedCourses();
  }

  private updatePagedCourses() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedCourses = this.filteredCourses.slice(start, start + this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(p: number) {
    this.currentPage = p;
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
  goToDetail(id: string) {
    this.router.navigate(['/courses', id]);
  }

  goToPlayer(id: string) {
    this.router.navigate(['/courses', id, 'player']);
  }
}
