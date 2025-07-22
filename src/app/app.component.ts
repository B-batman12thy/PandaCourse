import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./core/toast.component";
import { ToastService } from './core/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  auth = inject(AuthService);
  private toast = inject(ToastService);

  title = 'pandacourse';

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
    constructor() {}

}
