import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QuestionRequest } from "../models/question-request";
import { QuestionResponse } from "../models/question-response";

@Injectable()
export class ChatService {

    constructor(private http: HttpClient) { }

    sendMessage(request: QuestionRequest) {
        return this.http.post<QuestionResponse>("https://localhost:7274/question", request)
    }
}