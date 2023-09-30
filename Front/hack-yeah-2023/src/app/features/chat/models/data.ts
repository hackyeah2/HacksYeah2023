import { Dataset } from "./dataset";

export interface Data{
    type: string;
    title: string;
    labels: string[];
    datasets: Dataset[];
}