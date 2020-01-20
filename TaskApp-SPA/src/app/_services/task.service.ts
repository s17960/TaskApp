import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../_models/Task';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.url + 'task/';
  userId: number;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.url + this.userId);
  }

  setTaskDone(id: number) {
    return this.http.put(this.url + 'done/' + id, null);
  }

  deleteTask(id: number) {
    return this.http.delete(this.url + id);
  }

  changeTaskText(id: number, taskText: string) {
    return this.http.put(this.url + id + '/' + taskText, null);
  }

  deleteAllTasks(isDone: boolean) {
    return this.http.delete(this.url + 'isdone/' + this.userId + '/' + isDone);
  }

  setAllDone() {
    return this.http.put(this.url + 'alldone/' + this.userId, null);
  }

  addTask(taskText: string) {
    return this.http.post(this.url + this.userId + '/' + taskText, null);
  }
}
