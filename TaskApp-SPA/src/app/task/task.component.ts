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
  newTaskText = '';

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

  changeType() {
    for (let i = 0; i < this.toDoTasks.length; i++) {
      this.toDoTasks[i].editMode = false;
    }
    this.showDone = !this.showDone;
  }

  setTaskDone(id: number) {
    this.taskService.setTaskDone(id).subscribe(
      () => {
        this.getTasks();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.getTasks();
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
    this.taskService.changeTaskText(id, taskText).subscribe(
      () => {
        this.getTasks();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteAllTasks(accepted: boolean, isDone: boolean) {
    if (accepted) {
      this.taskService.deleteAllTasks(isDone).subscribe(
        () => {
          this.getTasks();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setAllDone(accepted: boolean) {
    if (accepted) {
      this.taskService.setAllDone().subscribe(
        () => {
          this.getTasks();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
