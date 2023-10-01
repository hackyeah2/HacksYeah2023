import { Data } from "./data";

export interface QuestionResponse {
    answer: string;
    source: Source;
    chartType: string;
    sessionId: string;
    data: any;
}

export interface Source {
    name: string;
    source: string;
}