import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEntradaDetalleComponent } from './info-entrada-detalle.component';

describe('InfoEntradaDetalleComponent', () => {
  let component: InfoEntradaDetalleComponent;
  let fixture: ComponentFixture<InfoEntradaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEntradaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEntradaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
