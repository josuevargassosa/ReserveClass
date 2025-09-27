import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasPageComponent } from './asignaturas-page.component';

describe('AsignaturasPageComponent', () => {
  let component: AsignaturasPageComponent;
  let fixture: ComponentFixture<AsignaturasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignaturasPageComponent]
    });
    fixture = TestBed.createComponent(AsignaturasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
