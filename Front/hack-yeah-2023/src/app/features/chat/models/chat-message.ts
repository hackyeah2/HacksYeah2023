import { Data } from "./data";

export interface ChatMessage {
    question: string;
    answer: string;
    chartData: Data;
}