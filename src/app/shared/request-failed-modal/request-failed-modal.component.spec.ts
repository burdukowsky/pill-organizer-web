import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestFailedModalComponent} from './request-failed-modal.component';

describe('RequestFailedModalComponent', () => {
  let component: RequestFailedModalComponent;
  let fixture: ComponentFixture<RequestFailedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestFailedModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFailedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
