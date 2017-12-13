import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyeditComponent } from './manyedit.component';

describe('ManyeditComponent', () => {
  let component: ManyeditComponent;
  let fixture: ComponentFixture<ManyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
