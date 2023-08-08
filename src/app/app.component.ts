import { Component, inject } from '@angular/core';

import { Outlet, Router } from '@tanstack/angular-router';

@Component({
  selector: 'app-root',
  template: `
    <a (click)="goHome()">Home</a> |
    <a (click)="goAbout()">About</a> |
    <a (click)="goNested()">Nested</a>

    <br /><br />

    <outlet></outlet>
  `,
  imports: [Outlet],
  standalone: true,
  styles: [
    `
      a {
        text-decoration: underline;
      }
    `,
  ],
})
export class AppComponent {
  router = inject(Router);

  goHome() {
    this.router.navigate({ to: '/'});
  }

  goAbout() {
    this.router.navigate({ to: '/about' });
  }

  goNested() {
    this.router.navigate({ to: '/parent/$id', params: { id: "child" } });
  }
}
