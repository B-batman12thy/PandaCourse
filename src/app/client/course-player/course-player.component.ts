// src/app/client/course-player/course-player.component.ts
import { Component, OnInit, inject }           from '@angular/core';
import { CommonModule }                from '@angular/common';
import { ActivatedRoute, RouterLink }              from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService }                  from '../../core/api/api.service';
import { Course }                      from '../../shared/models/course.model';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './course-player.component.html',
})
export class CoursePlayerComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  course?: Course;
  videoUrl?: SafeResourceUrl;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.api.getCourse(id).subscribe({
      next: c => {
        this.course = c;
        this.videoUrl = this.sanitizeYoutubeUrl(c.videoUrl);
      },
      error: () => console.error('Cours introuvable')
    });
  }

  private sanitizeYoutubeUrl(url: string): SafeResourceUrl {
    // extrait l'ID après "v="
    const match = url.match(/[?&]v=([^&]+)/);
    const videoId = match?.[1];
    if (!videoId) return '';
    const embed = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }
}
