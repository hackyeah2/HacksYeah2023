import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QuestionRequest } from "../models/question-request";
import { QuestionResponse } from "../models/question-response";

@Injectable()
export class ChatService {

    constructor(private http: HttpClient) { }

    sendMessage(request: QuestionRequest) {
        return this.http.post<QuestionResponse>("https://smartchatbot.politebeach-5edd8750.westeurope.azurecontainerapps.io", request)
    }
}