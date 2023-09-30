import { bootstrapApplication } from "@angular/platform-browser";
import { ChatComponent } from "./app/features/chat/chat.component";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { APP_ROUTES } from "./app/app.routing";
import { HttpClientModule } from "@angular/common/http";
import { ChatService } from "./app/features/chat/services/chat.service";
import { ChatCommunicationService } from "./app/features/chat/services/chat-communication.service";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ChatService, useClass: ChatService },
    { provide: ChatCommunicationService, useClass: ChatCommunicationService },
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(HttpClientModule)
  ]
});