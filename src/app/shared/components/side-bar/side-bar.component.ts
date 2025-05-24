import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import menu from '../../json/menu.json';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public listMenu: MenuItem[] = menu;

  private router = inject(Router);

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
