import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Toast {
  text:  string;
  type:  'success' | 'error' | 'info';
  id?:   number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private updates = new Subject<Toast[]>();

  getToasts(): Observable<Toast[]> {
    return this.updates.asObservable();
  }

  show(text: string, type: Toast['type'] = 'info', duration = 3000) {
    const toast: Toast = { text, type, id: Date.now() };
    this.toasts = [...this.toasts, toast];
    this.updates.next(this.toasts);

    // auto‑remove
    setTimeout(() => this.remove(toast.id!), duration);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.updates.next(this.toasts);
  }
}
