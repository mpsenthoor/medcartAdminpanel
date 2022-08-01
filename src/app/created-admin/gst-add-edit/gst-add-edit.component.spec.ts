import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstAddEditComponent } from './gst-add-edit.component';

describe('GstAddEditComponent', () => {
  let component: GstAddEditComponent;
  let fixture: ComponentFixture<GstAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
