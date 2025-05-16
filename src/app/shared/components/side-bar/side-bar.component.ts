import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  listMenu: any[] = []

  ngOnInit() {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.listMenu = [
      { title: "Início", route: '' },
      { title: "Transferências", route: '' },
      { title: "Investimentos", route: '' },
      { title: "Outros Serviços", route: ''},
    ]
  }
}
