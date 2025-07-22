// src/app/admin/course-form/course-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Course } from '../../shared/models/course.model';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toasts = inject(ToastService);

  form!: FormGroup;
  isEdit = false;
  courseId!: string;

  ngOnInit(): void {
    // Initialise le formulaire
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      videoUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      duration: [0, [Validators.required, Validators.min(1)]],
    });

    // Si on a un paramètre "id" dans l'URL, on bascule en mode édition
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.courseId = id;
        this.api.getCourse(id).subscribe({
          next: (course: Course) => {
            this.form.patchValue(course);
          },
          error: () => {
            this.toasts.show('Cours introuvable', 'error');
            this.router.navigate(['/admin/courses']);
          },
        });
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const request$ = this.isEdit
      ? this.api.updateCourse(this.courseId, this.form.value)
      : this.api.createCourse(this.form.value);

    request$.subscribe({
      next: () => {
        this.toasts.show(this.isEdit ? 'Cours mis à jour !' : 'Cours créé !', 'success');
        this.router.navigate(['/admin/courses']);
      },
      error: () => {
        this.toasts.show('Erreur lors de l’enregistrement', 'error');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/courses']);
  }
}
