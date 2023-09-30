import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ChatCommunicationService {

    private _sentMessageSubject = new Subject<string>();
    private _receivedMessageSubject = new Subject<string>();
    
    sentMessage$ = this._sentMessageSubject.asObservable();
    receivedMessage$ = this._receivedMessageSubject.asObservable();

    addSentMessage(message: string) {
        this._sentMessageSubject.next(message);
    }

    addReceivedMessage(message: string) {
        this._receivedMessageSubject.next(message);
    }
}