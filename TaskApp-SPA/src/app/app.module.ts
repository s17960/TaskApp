import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { ConfirmDeleteComponent } from './confirmDelete/confirmDelete.component';
import { ConfirmDoneComponent } from './confirmDone/confirmDone.component';


@NgModule({
   declarations: [
      AppComponent,
      TaskComponent,
      AddTaskComponent,
      ConfirmDeleteComponent,
      ConfirmDoneComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      FormsModule,
      ModalModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
