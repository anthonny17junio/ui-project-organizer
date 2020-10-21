import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static project: Project;
  constructor() { }

  public getProject(){
    return DataService.project;
  }

  public setProject(project: Project){
    DataService.project = project;
  }
}
