import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpolicyComponent } from './userpolicy.component';

describe('UserpolicyComponent', () => {
  let component: UserpolicyComponent;
  let fixture: ComponentFixture<UserpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
