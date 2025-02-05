import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoTiendasPage } from './ingreso-tiendas.page';

describe('IngresoTiendasPage', () => {
  let component: IngresoTiendasPage;
  let fixture: ComponentFixture<IngresoTiendasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoTiendasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoTiendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
