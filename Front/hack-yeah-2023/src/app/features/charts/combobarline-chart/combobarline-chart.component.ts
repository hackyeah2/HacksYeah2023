import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-combobarline-chart',
  templateUrl: './combobarline-chart.component.html',
  styleUrls: ['./combobarline-chart.component.scss'],
  standalone: true
})
export class CombobarlineChartComponent {
  chart: any;

  createChart(){
  
    this.chart = new Chart("MyComboBarLineChart", {
      data: {
        datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40]
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: [40, 30, 20, 10],
        }],
        labels: ['January', 'February', 'March', 'April']
    },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Chart.js Floating Bar/Line Chart'
          }
        }
      }
      
    });
  }

  ngOnInit(){
    this.createChart();
  }
}
