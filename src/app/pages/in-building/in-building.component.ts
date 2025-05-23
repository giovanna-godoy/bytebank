import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-building',
  imports: [],
  templateUrl: './in-building.component.html',
  styleUrl: './in-building.component.scss'
})
export class InBuildingComponent {
  private router = inject(Router);

  backToHome() {
    this.router.navigate([`/home`]);
  }
}
