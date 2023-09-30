import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChatMessageSentComponent } from "../chat-message-sent/chat-message-sent.component";
import { ChatMessageReceivedComponent } from "../chat-message-received/chat-message-received.component";
import { ChatCommunicationService } from "../services/chat-communication.service";
import { ChatMessage } from "../models/chat-message";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-chat-message-container',
    templateUrl: './chat-message-container.component.html',
    styleUrls: ['./chat-message-container.component.scss'],
    standalone: true,
    imports: [ChatMessageSentComponent, ChatMessageReceivedComponent, CommonModule]
})
  export class ChatMessageContainerComponent implements OnInit, OnDestroy {

    chatMessages: ChatMessage[] = [];

    private _addMessageSub!: Subscription;
    private _receiveMessageSub!: Subscription;

    constructor(private chatCommunicationService: ChatCommunicationService) { }

    ngOnInit(): void {
      this._addMessageSub = this.chatCommunicationService.sentMessage$.subscribe(msg => {
        this.chatMessages.push(<ChatMessage> {
          question: msg
        })
      })

      this._receiveMessageSub = this.chatCommunicationService.receivedMessage$.subscribe(msg => {
         let message = this.chatMessages[this.chatMessages.length - 1];
         if(message) {
          message.answer = msg;
         }
      })
    }

  ngOnDestroy(): void {
    this._addMessageSub.unsubscribe();
    this._receiveMessageSub.unsubscribe();
  }

  }