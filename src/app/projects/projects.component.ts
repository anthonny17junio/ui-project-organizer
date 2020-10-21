import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project';
import { AuthServiceService } from '../services/auth-service.service';
import { DataService } from '../services/data.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthServiceService, private router:Router, private projectService: ProjectService, private dataService:DataService) { }
  ngOnDestroy(): void {
    
  }

  projects = [];
  projectsTemp = [];

  ngOnInit(): void {
    var idUser = this.authService.getIduser();
    this.projectService.getProjects(idUser).subscribe(result => {
      this.projects = result;
      this.projectsTemp = result;
    })
  }
  

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToTasks(project){
    this.dataService.setProject(project);
    this.router.navigate(['/tasks'], {replaceUrl: true  });
  }

  filterProjects(){
    this.projects = this.projectsTemp;
    var wordToFilter = String((<HTMLInputElement>document.getElementById("inputSearch")).value);
    wordToFilter = wordToFilter.toUpperCase();
    this.projects = this.projects.filter(project => project.name.toUpperCase().includes(wordToFilter));
  }
}
