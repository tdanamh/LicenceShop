import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewPropertyComponent } from './dialog-new-property.component';

describe('DialogNewPropertyComponent', () => {
  let component: DialogNewPropertyComponent;
  let fixture: ComponentFixture<DialogNewPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
