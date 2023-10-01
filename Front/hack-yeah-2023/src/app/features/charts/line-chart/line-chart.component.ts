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
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Liczba sprzedanych mieszkań",
            data: ['10','76', '72', '79', '92',
								 '74', '73', '76'],
            backgroundColor: 'blue'
          },
          {
            label: "Liczba wystawionych mieszkań",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Liczba mieszkań w Krakowie w zależności od dnia'
          }
        }
      }
      
      
    });
  }

  ngOnInit(){
    this.createChart();
  }
}
