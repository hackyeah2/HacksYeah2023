import { Data } from "./data";

export interface QuestionResponse {
    answer: string;
    chartData: Data;
    showChart: boolean;
}