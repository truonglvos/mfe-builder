import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineElementComponent } from './headline-element.component';

describe('HeadlineElementComponent', () => {
  let component: HeadlineElementComponent;
  let fixture: ComponentFixture<HeadlineElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadlineElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadlineElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
