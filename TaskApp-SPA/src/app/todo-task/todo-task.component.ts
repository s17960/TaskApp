import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/Task';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements OnInit {
  @Input() toDoTasks: Task[];
  @Output() reloadPage = new EventEmitter();
  newTaskText = '';

  constructor(
    private taskService: TaskService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  setAllDone(accepted: boolean) {
    if (accepted) {
      this.taskService.setAllDone().subscribe(
        () => {
          this.reloadPage.emit();
          this.alertifyService.warning('Wszystkie zadania zrobione!');
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  deleteAllTodoTasks(accepted: boolean) {
    if (accepted) {
      this.taskService.deleteAllTasks(false).subscribe(
        () => {
          this.reloadPage.emit();
          this.alertifyService.error('Usunięto wszystkie zadania!');
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  changeTaskText(id: number, taskText: string) {
    this.taskService.changeTaskText(id, taskText).subscribe(
      () => {
        this.reloadPage.emit();
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

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.reloadPage.emit();
        this.alertifyService.error(
          'Usunięto zadanie!' //+ this.toDoTasks.find(x => x.id == id).taskText
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  setTaskDone(id: number) {
    this.taskService.setTaskDone(id).subscribe(
      () => {
        this.alertifyService.warning('Wykonano zadanie!');
        this.reloadPage.emit();
      },
      error => {
        console.log(error);
      }
    );
  }
}
