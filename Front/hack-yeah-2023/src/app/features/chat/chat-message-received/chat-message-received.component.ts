import { Component, Input } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-chat-message-received',
    templateUrl: './chat-message-received.component.html',
    styleUrls: ['./chat-message-received.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, CommonModule]
})
  export class ChatMessageReceivedComponent {

    @Input() receivedMessage!: string | undefined;
  }