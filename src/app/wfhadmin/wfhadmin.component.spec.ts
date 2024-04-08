import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhadminComponent } from './wfhadmin.component';

describe('WfhadminComponent', () => {
  let component: WfhadminComponent;
  let fixture: ComponentFixture<WfhadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WfhadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WfhadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
