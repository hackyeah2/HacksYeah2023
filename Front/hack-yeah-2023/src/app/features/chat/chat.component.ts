import { Component } from "@angular/core";
import { ChatInputComponent } from "./chat-input/chat-input.component";
import { ChatMessageContainerComponent } from "./chat-message-container/chat-message-container.component";
import { ChatCommunicationService } from "./services/chat-communication.service";
import { ChatService } from "./services/chat.service";
import { QuestionRequest } from "./models/question-request";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [ChatInputComponent, ChatMessageContainerComponent]
})
  export class ChatComponent {

    delay! : boolean;

    constructor(private chatCommunicationService: ChatCommunicationService,
       private chatService: ChatService) { }

    handleMessageNotification(message: string) {
      this.chatCommunicationService.addSentMessage(message);
      this.chatCommunicationService.setMessageTypingDisabled(true);

      this.chatService.sendMessage(<QuestionRequest> {
        question: message
      }).subscribe(response => {
        this.chatCommunicationService.addReceivedMessage(response);
      });
    }

    handleDelayNotification(message: boolean){
      this.delay = message;
    }
  }