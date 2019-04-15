import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoProductosPage } from './ingreso-productos.page';

describe('IngresoProductosPage', () => {
  let component: IngresoProductosPage;
  let fixture: ComponentFixture<IngresoProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoProductosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
