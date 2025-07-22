import { Component, OnInit }            from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService }                   from '../../core/api/api.service';
import { Course }                       from '../../shared/models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent implements OnInit {
  course?: Course;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getCourse(id).subscribe({
        next: c   => this.course = c,
        error: () => console.error('Cours introuvable')
      });
    }
  }
}
