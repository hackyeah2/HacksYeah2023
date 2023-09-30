import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ChatCommunicationService {

    private _sentMessageSubject = new Subject<string | undefined>();
    private _receivedMessageSubject = new Subject<string | undefined>();
    
    sentMessage$ = this._sentMessageSubject.asObservable();
    receivedMessage$ = this._receivedMessageSubject.asObservable();

    addSentMessage(message: string | undefined) {
        this._sentMessageSubject.next(message);
    }

    addReceivedMessage(message: string | undefined) {
        this._receivedMessageSubject.next(message);
    }
}