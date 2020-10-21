import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project';
import { DataService } from '../services/data.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  project: Project;
  tasks = [];

  constructor(private authService: AuthServiceService, private router:Router, private dataService: DataService, private taskService: TaskService) {
  }


  ngOnInit(): void {
    this.project = this.dataService.getProject();
    if(this.project !== undefined){
      localStorage.setItem("currentProject", JSON.stringify(this.project));
    }else{
      var currentProjectLocalStorage = localStorage.getItem("currentProject");
      this.project = JSON.parse(currentProjectLocalStorage);
    }

    this.taskService.getTasks(this.project.id).subscribe(result => {
      this.tasks = result;
    })
  }

  navigateToProjects(){
    this.router.navigate(['/projects']);
  }
}
