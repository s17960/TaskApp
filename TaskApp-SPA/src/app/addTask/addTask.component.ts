import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addTask',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.css']
})
export class AddTaskComponent implements OnInit {
  url = 'http://localhost:5000/api/task'
  @Output() addTaskEvent = new EventEmitter();
  newTask: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  addTask(taskText: string){
    if(taskText != '')
    this.http.post(this.url + '/' + taskText, null).subscribe(() => {
      this.addTaskEvent.emit('newTask');
      this.newTask = '';
    }, error => {
      console.log(error);
    })
  }



}
