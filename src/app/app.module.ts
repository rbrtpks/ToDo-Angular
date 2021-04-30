import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDataComponent } from './list-data/list-data.component';
import { ListDataService } from './list-data/list-data.service';
import { ModalNewTask } from './list-data/new-task-modal';
import { WebSocketService } from './websocket/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    ListDataComponent,
    ModalNewTask
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    ListDataService,
    ModalNewTask,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
