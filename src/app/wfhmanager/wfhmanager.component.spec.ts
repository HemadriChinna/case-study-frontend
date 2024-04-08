import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhmanagerComponent } from './wfhmanager.component';

describe('WfhmanagerComponent', () => {
  let component: WfhmanagerComponent;
  let fixture: ComponentFixture<WfhmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WfhmanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WfhmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
