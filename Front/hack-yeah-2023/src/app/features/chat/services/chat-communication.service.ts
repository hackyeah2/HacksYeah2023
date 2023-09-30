import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { QuestionResponse } from "../models/question-response";

@Injectable()
export class ChatCommunicationService {

    private _sentMessageSubject = new Subject<string>();
    private _receivedMessageSubject = new Subject<QuestionResponse>();
    
    sentMessage$ = this._sentMessageSubject.asObservable();
    receivedMessage$ = this._receivedMessageSubject.asObservable();

    addSentMessage(message: string) {
        this._sentMessageSubject.next(message);
    }

    addReceivedMessage(message: QuestionResponse) {
        this._receivedMessageSubject.next(message);
    }
}