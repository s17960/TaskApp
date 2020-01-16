import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../_models/Task';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  url = 'http://localhost:5000/api/task';
  doneTasks: Task[];
  toDoTasks: Task[];
  showDone = false;
  editedTaskText: string;
  newTaskText = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDoneTasks();
    this.getToDoTasks();
  }

  getDoneTasks() {
    this.http.get<Task[]>(this.url + '/done').subscribe(
      response => {
        this.doneTasks = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getToDoTasks() {
    this.http.get<Task[]>(this.url + '/todo').subscribe(
      response => {
        this.toDoTasks = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  changeType() {
    for (let i = 0; i < this.toDoTasks.length; i++) {
      this.toDoTasks[i].editMode = false;
    }
    this.showDone = !this.showDone;
  }

  setTaskDone(id: number) {
    this.http.put(this.url + '/done/' + id, null).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTask(id: number) {
    this.http.delete(this.url + '/' + id).subscribe(
      () => {
        this.getToDoTasks();
        this.getDoneTasks();
      },
      error => {
        console.log(error);
      }
    );
  }

  changeEditMode(id: number) {
    for (let i = 0; i < this.toDoTasks.length; i++) {
      this.toDoTasks[i].editMode = false;
    }
    this.newTaskText = this.toDoTasks[id].taskText;
    this.toDoTasks[id].editMode = true;
  }

  changeTaskText(id: number, taskText: string) {
    this.http.put(this.url + '/' + id + '/' + taskText, null).subscribe(
      response => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteAllTasks(accepted: boolean, isDone: boolean) {
    if (accepted) {
      this.http.delete(this.url + '/isdone/' + isDone).subscribe(
        () => {
          this.getToDoTasks();
          this.getDoneTasks();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setAllDone(accepted: boolean) {
    if (accepted) {
      this.http.put(this.url + '/alldone', null).subscribe(
        () => {
          this.getToDoTasks();
          this.getDoneTasks();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
