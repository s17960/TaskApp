import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-addTask',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() addTaskEvent = new EventEmitter();
  newTask = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  addTask(taskText: string) {
    this.taskService.addTask(taskText).subscribe(
      response => {
        this.addTaskEvent.emit(response);
        this.newTask = '';
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
