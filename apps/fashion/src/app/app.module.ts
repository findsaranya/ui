import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './modules/core.module';
import { StateModule } from './modules/state.module';
import { ChatModule } from './modules/chat.module';
import { AppRoutingModule } from './modules/app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    StateModule,
    ChatModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
