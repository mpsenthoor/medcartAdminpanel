import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddEditComponent } from './shop-add-edit.component';

describe('ShopAddEditComponent', () => {
  let component: ShopAddEditComponent;
  let fixture: ComponentFixture<ShopAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
