import { ChatCommunicationService } from '../../chat/services/chat-communication.service';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from "@angular/common";
import { ChartsDialogComponent } from "../../charts/charts-dialog/charts-dialog.component";
import { QuestionResponse } from "../models/question-response";
import { ChatMessage } from "../models/chat-message";
import { Data } from "../models/data";

@Component({
    selector: 'app-chat-message-received',
    templateUrl: './chat-message-received.component.html',
    styleUrls: ['./chat-message-received.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, CommonModule]
})
  export class ChatMessageReceivedComponent {

    @Input() answer!: string;
    @Input() chartData!: Data;
    @Input() showChart!: boolean;

    private contentPlaceholder!: ElementRef;

    @ViewChild('receivedMessageElement') set content(content: ElementRef) {
       if(content) { 
           this.contentPlaceholder = content;
           this.startTyping();
       }
      }

    constructor(public dialog: MatDialog, private chatCommunicationService: ChatCommunicationService) {}

    openChartsDialog(): void {
      this.dialog.open(ChartsDialogComponent, {
          height: '200px',
          width: '500px',
          data: {chartData: this.chartData!} 
      });
  }

  private startTyping(): void {
    const word = this.answer.split("");
    const continueTyping = () => {
      if (word.length > 0) {
        this.contentPlaceholder.nativeElement.innerHTML += word.shift();
      } else {
        this.chatCommunicationService.setMessageTypingDisabled(false);
        return;
      }
      setTimeout(continueTyping, 20);
    };
    continueTyping();
  }
  }