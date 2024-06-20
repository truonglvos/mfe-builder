import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxElementComponent } from './box-element.component';

describe('BoxElementComponent', () => {
  let component: BoxElementComponent;
  let fixture: ComponentFixture<BoxElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
