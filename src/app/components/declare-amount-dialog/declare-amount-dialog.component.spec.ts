import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclareAmountDialogComponent } from './declare-amount-dialog.component';

describe('DeclareAmountDialogComponent', () => {
  let component: DeclareAmountDialogComponent;
  let fixture: ComponentFixture<DeclareAmountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclareAmountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareAmountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
