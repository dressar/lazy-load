import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEntradaComponent } from './info-entrada.component';

describe('InfoEntradaComponent', () => {
  let component: InfoEntradaComponent;
  let fixture: ComponentFixture<InfoEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
