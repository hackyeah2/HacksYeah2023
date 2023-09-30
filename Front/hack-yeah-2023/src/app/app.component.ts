import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
})
export class AppComponent {
  title = 'hackyeah-front';
}
