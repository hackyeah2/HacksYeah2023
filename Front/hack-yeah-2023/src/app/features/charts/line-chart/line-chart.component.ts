import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { Data } from '../../chat/models/data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  standalone: true
})
export class LineChartComponent {
  chart: any;
  @Input() data!: Data;
  
  createChart(){


    console.log(this.data);
    this.chart = new Chart("MyLineChart", {
      type: 'line',
      data: {
        labels: this.data.labels, 
	      datasets: []
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: this.data.title
          }
        }
      }
      
    });
    let datasetArray = [];
    for (let i =0; i<this.data.datasets.length; i++){
      datasetArray.push(
        {
          label: this.data.datasets[i].label,
          data: this.data.datasets[i].data
        }
      )
    }
    console.log(datasetArray)
    this.chart.data.datasets = datasetArray;
    this.chart.update();

  }

  ngOnInit(){
    this.createChart();
  }
}
