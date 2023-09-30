import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from "../services/chat.service";
import { QuestionRequest } from "../models/question-request";

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.scss'],
    imports: [ReactiveFormsModule, MatIconModule, CommonModule ],
    standalone: true
  })
  export class ChatInputComponent implements OnInit {

    private _message!: string | undefined;

    isDisabled = true;
    messageFormControl = new FormControl('');

    @Output() messageNotification: EventEmitter<string | undefined> = new EventEmitter();

    ngOnInit(): void {
      this.messageFormControl.valueChanges.subscribe(val => {
        this._message = val?.trim();
        if(this._message && this._message.length) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      });
    }

    sendMessageNotification() {
      this.messageNotification.emit(this._message);
    }
  }