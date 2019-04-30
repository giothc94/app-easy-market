import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectuarCompraPage } from './efectuar-compra.page';

describe('EfectuarCompraPage', () => {
  let component: EfectuarCompraPage;
  let fixture: ComponentFixture<EfectuarCompraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfectuarCompraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfectuarCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
