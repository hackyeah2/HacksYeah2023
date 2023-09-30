import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';

export const APP_ROUTES: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: ChatComponent
    },
  ];