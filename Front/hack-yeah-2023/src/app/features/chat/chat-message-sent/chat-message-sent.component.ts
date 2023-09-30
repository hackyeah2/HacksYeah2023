import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-chat-message-sent',
    templateUrl: './chat-message-sent.component.html',
    styleUrls: ['./chat-message-sent.component.scss'],
    imports: [ CommonModule ],
    standalone: true
})
  export class ChatMessageSentComponent {

    @Input() sentMessage!: string;
    
  }