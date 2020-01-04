import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../_models/Task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  url = 'http://localhost:5000/api/task'
  doneTasks: Task[];
  toDoTasks: Task[];
  showType: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDoneTasks();
    this.getToDoTasks();
  }

  getDoneTasks() {
    this.http.get<Task[]>(this.url + '/done').subscribe(response => {
      this.doneTasks = response;
    }, error => {
      console.log(error);
    });
  }

  getToDoTasks() {
    this.http.get<Task[]>(this.url + '/todo').subscribe(response => {
      this.toDoTasks = response;
    }, error => {
      console.log(error);
    });
  }

  changeType() {
    this.showType = !this.showType;
  }

}
