import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombobarlineChartComponent } from './combobarline-chart.component';

describe('CombobarlineChartComponent', () => {
  let component: CombobarlineChartComponent;
  let fixture: ComponentFixture<CombobarlineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombobarlineChartComponent]
    });
    fixture = TestBed.createComponent(CombobarlineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
