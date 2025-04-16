import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMovimientoComponent } from './registro-movimiento.component';

describe('RegistroMovimientoComponent', () => {
  let component: RegistroMovimientoComponent;
  let fixture: ComponentFixture<RegistroMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroMovimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
