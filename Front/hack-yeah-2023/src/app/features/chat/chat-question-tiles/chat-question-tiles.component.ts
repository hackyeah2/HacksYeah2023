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
    public question1: string = "Jak kreują sie opłaty za mieszkanie?";
    public question2: string = "Ile średnio osób zamieszkuje w danym mieszkaniu w powiecie wrocławskim?";
    public question3: string = "Czy warto inwestować na rynku mieszkaniowym?";
    public question4: string = "What is an average floor space?"

    @Output() predefinedMessage: EventEmitter<string> = new EventEmitter();

    public sendPredefinedMessage(question: string){
      this.predefinedMessage.emit(question);
    }

}