import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { ConfirmDeleteComponent } from './confirmDelete/confirmDelete.component';
import { ConfirmDoneComponent } from './confirmDone/confirmDone.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { TaskService } from './_services/task.service';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    AddTaskComponent,
    ConfirmDeleteComponent,
    ConfirmDoneComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [TaskService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}