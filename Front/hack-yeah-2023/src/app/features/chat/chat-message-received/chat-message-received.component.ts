import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from "@angular/common";
import { ChartsDialogComponent } from "../../charts/charts-dialog/charts-dialog.component";

@Component({
    selector: 'app-chat-message-received',
    templateUrl: './chat-message-received.component.html',
    styleUrls: ['./chat-message-received.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, CommonModule]
})
  export class ChatMessageReceivedComponent implements AfterViewInit {

    @Input() receivedMessage!: string;

    private contentPlaceholder!: ElementRef;

    @ViewChild('receivedMessageElement') set content(content: ElementRef) {
       if(content) { 
           this.contentPlaceholder = content;
           this.startTyping();
       }
      }

    constructor(public dialog: MatDialog) {}

    openChartsDialog(): void {
      this.dialog.open(ChartsDialogComponent, {
          height: '200px',
          width: '500px'
      });
  }

  ngAfterViewInit(): void {
    
  }

  private startTyping(): void {
    const word = this.receivedMessage.split("");
    const continueTyping = () => {
      if (word.length > 0) {
        this.contentPlaceholder.nativeElement.innerHTML += word.shift();
      }
      setTimeout(continueTyping, 50);
    };
    continueTyping();
  }

  }