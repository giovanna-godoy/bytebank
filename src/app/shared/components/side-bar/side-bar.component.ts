import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  public listMenu: MenuItem[] = [];

  private router = inject(Router);

  ngOnInit() {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.listMenu = [
      { title: "Início", route: 'home' },
      { title: "Transferências", route: 'transfers' },
      { title: "Investimentos", route: 'investments' },
      { title: "Outros Serviços", route: 'others-services'},
    ]
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
