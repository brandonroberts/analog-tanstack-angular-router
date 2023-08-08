import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { getRouteParams } from '@tanstack/angular-router';

@Component({
  selector: 'child',
  standalone: true,
  imports: [CommonModule],
  template: ` Child {{ (params$ | async)?.id }}`,
})
export class ChildComponent {
  params$ = getRouteParams<{ id: string }>();
}
