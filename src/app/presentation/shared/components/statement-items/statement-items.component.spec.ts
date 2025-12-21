import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementItemsComponent } from './statement-items.component';

describe('StatementItemsComponent', () => {
  let component: StatementItemsComponent;
  let fixture: ComponentFixture<StatementItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
