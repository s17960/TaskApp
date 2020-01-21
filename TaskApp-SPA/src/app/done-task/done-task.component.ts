import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/Task';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css']
})
export class DoneTaskComponent implements OnInit {
  @Input() doneTasks: Task[];
  @Output() reloadPage = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  deleteAllDoneTasks(accepted: boolean) {
    if (accepted) {
      this.taskService.deleteAllTasks(true).subscribe(
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

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.reloadPage.emit();
        this.alertifyService.error('Usunięto zadanie!');
      },
      error => {
        console.log(error);
      }
    );
  }
}
