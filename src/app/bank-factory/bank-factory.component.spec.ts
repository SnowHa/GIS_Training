import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFactoryComponent } from './bank-factory.component';

describe('BankFactoryComponent', () => {
  let component: BankFactoryComponent;
  let fixture: ComponentFixture<BankFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
