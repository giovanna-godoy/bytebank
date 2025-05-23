import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InBuildingComponent } from './in-building.component';

describe('InBuildingComponent', () => {
  let component: InBuildingComponent;
  let fixture: ComponentFixture<InBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InBuildingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
