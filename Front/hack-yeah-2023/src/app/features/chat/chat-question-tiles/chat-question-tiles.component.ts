import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-chat-question-tiles',
    templateUrl: './chat-question-tiles.component.html',
    styleUrls: ['./chat-question-tiles.component.scss'],
    imports: [ CommonModule ],
    standalone: true
})
  export class ChatQuestionTilesComponent {
    public category: string = "Nieruchomości";
    public question1: string = "Jak kreują sie oplaty za mieszkanie?";
    public question2: string = "Ile jest mieszkań w Polsce?";
    public question3: string = "Co ja tutaj robię?";
    public question4: string = "Dokąd tupta nocą jeż?"

    @Output() predefinedMessage: EventEmitter<string> = new EventEmitter();

    public sendPredefinedMessage(question: string){
      this.predefinedMessage.emit(question);
    }

}