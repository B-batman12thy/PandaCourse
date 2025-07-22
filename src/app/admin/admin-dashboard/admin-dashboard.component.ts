// src/app/admin/admin-dashboard/admin-dashboard.component.ts
import { Component }       from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterModule }    from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,             // ← mode standalone
  imports: [
    CommonModule,               // pour NgIf, NgFor…
    RouterModule                // pour <router-outlet>, routerLink…
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls:   ['./admin-dashboard.component.scss']  // ← pluriel !
})
export class AdminDashboardComponent {
  // logout(){}
}
