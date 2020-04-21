import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOwnerComponent } from './bank-owner.component';

describe('BankOwnerComponent', () => {
  let component: BankOwnerComponent;
  let fixture: ComponentFixture<BankOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
