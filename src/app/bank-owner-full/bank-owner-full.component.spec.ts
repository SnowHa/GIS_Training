import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOwnerFullComponent } from './bank-owner-full.component';

describe('BankOwnerFullComponent', () => {
  let component: BankOwnerFullComponent;
  let fixture: ComponentFixture<BankOwnerFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankOwnerFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankOwnerFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
