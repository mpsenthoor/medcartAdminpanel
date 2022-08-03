import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyAddEditComponent } from './currency-add-edit.component';

describe('CurrencyAddEditComponent', () => {
  let component: CurrencyAddEditComponent;
  let fixture: ComponentFixture<CurrencyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
