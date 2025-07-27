import { Component, inject, Input } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import menu from '../../json/menu.json';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public listMenu: MenuItem[] = menu;

  @Input() userName:string = '';

  private router = inject(Router);

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  trackByRoute(index: number, item: MenuItem): string {
    return item.route;
  }
}
