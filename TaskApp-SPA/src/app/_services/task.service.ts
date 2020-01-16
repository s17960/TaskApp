import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../_models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.url + 'task';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.url);
  }

  getDoneTasks() {
    return this.http.get<Task[]>(this.url + '/done');
  }

  getToDoTasks() {
    this.http.get<Task[]>(this.url + '/todo').subscribe(
      response => {
        return response;
      },
      error => {
        console.log(error);
      }
    );
  }

  setTaskDone(id: number) {
    return this.http.put(this.url + '/done/' + id, null);
  }

  deleteTask(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  changeTaskText(id: number, taskText: string) {
    return this.http.put(this.url + '/' + id + '/' + taskText, null);
  }

  deleteAllTasks(isDone: boolean) {
    return this.http.delete(this.url + '/isdone/' + isDone);
  }

  setAllDone() {
    return this.http.put(this.url + '/alldone', null);
  }

  addTask(taskText: string) {
    return this.http.post(this.url + '/' + taskText, null);
  }
}
