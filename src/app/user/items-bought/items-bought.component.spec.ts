import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBoughtComponent } from './items-bought.component';

describe('ItemsBoughtComponent', () => {
  let component: ItemsBoughtComponent;
  let fixture: ComponentFixture<ItemsBoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsBoughtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
