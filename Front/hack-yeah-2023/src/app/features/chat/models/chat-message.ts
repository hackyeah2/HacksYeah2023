import { Data } from "./data";
import { Source } from "./question-response";

export interface ChatMessage {
    question: string;
    answer: string;
    chartData: Data;
    showChart: boolean;
    source: Source;
}