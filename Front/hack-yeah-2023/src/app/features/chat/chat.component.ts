import { Component } from "@angular/core";
import { ChatInputComponent } from "./chat-input/chat-input.component";
import { ChatMessageContainerComponent } from "./chat-message-container/chat-message-container.component";
import { ChatCommunicationService } from "./services/chat-communication.service";
import { ChatService } from "./services/chat.service";
import { QuestionRequest } from "./models/question-request";
import { NgxSpinnerService, NgxSpinnerModule} from "ngx-spinner";
import { catchError, of, timeout } from "rxjs";
import { QuestionResponse } from "./models/question-response";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [ChatInputComponent, ChatMessageContainerComponent, NgxSpinnerModule]
})
  export class ChatComponent {

    delay! : boolean;

    constructor(private chatCommunicationService: ChatCommunicationService,
       private chatService: ChatService,
       private spinnerService: NgxSpinnerService) { }

    handleMessageNotification(message: string) {
      this.chatCommunicationService.addSentMessage(message);
      this.chatCommunicationService.setMessageTypingDisabled(true);
      this.spinnerService.show();

      this.chatService.sendMessage(<QuestionRequest> {
        question: message,
        sessionId: '123'
      })
      .pipe(timeout(60000),
        catchError(() => {
          this.spinnerService.hide();
          this.chatCommunicationService.setMessageTypingDisabled(false);
          return of(<QuestionResponse>{
            answer: 'Nie udało się pobrać danych.',
            showChart: false
          })
        })
      )
      .subscribe(response => {
        this.chatCommunicationService.addReceivedMessage(response);
      });
    }

    handleDelayNotification(message: boolean){
      this.delay = message;
    }
  }