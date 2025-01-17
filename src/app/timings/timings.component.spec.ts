import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimingsComponent } from './timings.component';

describe('TimingsComponent', () => {
  let component: TimingsComponent;
  let fixture: ComponentFixture<TimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
