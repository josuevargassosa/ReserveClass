import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriosPageComponent } from './laboratorios-page.component';

describe('LaboratoriosPageComponent', () => {
  let component: LaboratoriosPageComponent;
  let fixture: ComponentFixture<LaboratoriosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoriosPageComponent]
    });
    fixture = TestBed.createComponent(LaboratoriosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
