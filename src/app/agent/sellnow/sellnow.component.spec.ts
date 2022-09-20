import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellnowComponent } from './sellnow.component';

describe('SellnowComponent', () => {
  let component: SellnowComponent;
  let fixture: ComponentFixture<SellnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellnowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
