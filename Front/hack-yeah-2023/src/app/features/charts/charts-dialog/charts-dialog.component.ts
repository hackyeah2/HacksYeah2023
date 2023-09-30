import { Component } from "@angular/core";
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { LineChartComponent } from "../line-chart/line-chart.component";
import { CombobarlineChartComponent } from "../combobarline-chart/combobarline-chart.component";

@Component({
    selector: 'app-charts-dialog',
    imports: [BarChartComponent, LineChartComponent, CombobarlineChartComponent],
    templateUrl: './charts-dialog.component.html',
    styleUrls: ['./charts-dialog.component.scss'],
    standalone: true,
})
  export class ChartsDialogComponent {

  }