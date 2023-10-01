import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ChatMessageSentComponent } from "../chat-message-sent/chat-message-sent.component";
import { ChatMessageReceivedComponent } from "../chat-message-received/chat-message-received.component";
import { ChatCommunicationService } from "../services/chat-communication.service";
import { ChatMessage } from "../models/chat-message";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { ChatQuestionTilesComponent } from "../chat-question-tiles/chat-question-tiles.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-chat-message-container',
    templateUrl: './chat-message-container.component.html',
    styleUrls: ['./chat-message-container.component.scss'],
    standalone: true,
    imports: [ChatMessageSentComponent, ChatMessageReceivedComponent, CommonModule, ChatQuestionTilesComponent]
})
  export class ChatMessageContainerComponent implements OnInit, OnDestroy {

    chatMessages: ChatMessage[] = [];

    private _addMessageSub!: Subscription;
    private _receiveMessageSub!: Subscription;

    @Output() delayNotification: EventEmitter<boolean> = new EventEmitter();

    constructor(private chatCommunicationService: ChatCommunicationService,
      private spinnerService: NgxSpinnerService) { }

    ngOnInit(): void {
      this._addMessageSub = this.chatCommunicationService.sentMessage$.subscribe(msg => {
        this.chatMessages.push(<ChatMessage> {
          question: msg
        })
        
        this.delayNotification.emit(true);
      })

      this._receiveMessageSub = this.chatCommunicationService.receivedMessage$.subscribe(msg => {
         let message = this.chatMessages[this.chatMessages.length - 1];
         if(message) {
          message.answer = msg?.answer + ' \n źródło: ' + msg?.source.name;
          message.chartData = msg?.chartData;
          message.showChart = msg?.showChart;
         }

         this.spinnerService.hide();
         this.delayNotification.emit(false);
      })
    }

  ngOnDestroy(): void {
    this._addMessageSub.unsubscribe();
    this._receiveMessageSub.unsubscribe();
  }

  }