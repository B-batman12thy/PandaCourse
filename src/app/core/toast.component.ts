// src/app/core/toast.component.ts
import { Component, OnInit, inject }   from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Positionné en haut à droite, de grande largeur -->
    <div class="fixed top-4 right-4 z-50 space-y-4">
      <div
        *ngFor="let t of toasts"
        class="w-96 px-6 py-4 rounded-lg shadow-lg flex justify-between items-center
               transition-transform transform hover:scale-105"
        [ngClass]="{
          'bg-green-100 text-green-800':  t.type === 'success',
          'bg-red-100   text-red-800':    t.type === 'error',
          'bg-blue-100  text-blue-800':   t.type === 'info'
        }"
      >
        <span class="text-lg">{{ t.text }}</span>
        <button
          (click)="remove(t.id!)"
          class="text-xl font-bold leading-none focus:outline-none"
          aria-label="Close"
        >&times;</button>
      </div>
    </div>
  `
})
export class ToastComponent implements OnInit {
  private toast = inject(ToastService);

  toasts: Toast[] = [];
  ngOnInit() {
    this.toast.getToasts().subscribe(ts => this.toasts = ts);
  }

  remove(id: number) {
    this.toast.remove(id);
  }
}
