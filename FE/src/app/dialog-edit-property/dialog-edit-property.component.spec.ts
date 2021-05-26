import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPropertyComponent } from './dialog-edit-property.component';

describe('DialogEditPropertyComponent', () => {
  let component: DialogEditPropertyComponent;
  let fixture: ComponentFixture<DialogEditPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
