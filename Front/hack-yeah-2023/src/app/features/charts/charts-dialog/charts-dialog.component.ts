import { Component, Inject } from "@angular/core";
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { LineChartComponent } from "../line-chart/line-chart.component";
import { CombobarlineChartComponent } from "../combobarline-chart/combobarline-chart.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "../../chat/models/data";

@Component({
    selector: 'app-charts-dialog',
    imports: [BarChartComponent, LineChartComponent, CombobarlineChartComponent],
    templateUrl: './charts-dialog.component.html',
    styleUrls: ['./charts-dialog.component.scss'],
    standalone: true,
})
  export class ChartsDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {chartData: Data}){}
  }