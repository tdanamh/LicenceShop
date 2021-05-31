import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightNavbarComponent } from './copyright-navbar.component';

describe('CopyrightNavbarComponent', () => {
  let component: CopyrightNavbarComponent;
  let fixture: ComponentFixture<CopyrightNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
