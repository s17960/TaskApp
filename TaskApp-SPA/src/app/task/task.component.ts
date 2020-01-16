import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../_models/Task';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  doneTasks: Task[];
  toDoTasks: Task[];
  showDone = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      response => {
        this.toDoTasks = response.filter(x => x.isDone == false);
        this.doneTasks = response.filter(x => x.isDone == true);
      },
      error => {
        console.log(error);
      }
    );
  }

  getToDoTasks(toDoTasks: Task[]) {
    this.toDoTasks = toDoTasks;
  }

  changeType() {
    for (let i = 0; i < this.toDoTasks.length; i++) {
      this.toDoTasks[i].editMode = false;
    }
    this.showDone = !this.showDone;
  }
}
