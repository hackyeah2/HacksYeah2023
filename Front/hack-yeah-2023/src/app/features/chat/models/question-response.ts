import { Data } from "./data";

export interface QuestionResponse {
    answer: string;
    chartData: Data;
    showChart: boolean;
    source: Source;
}

export interface Source {
    source: string;
    name: string;
}