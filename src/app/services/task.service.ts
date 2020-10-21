import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient, private authService:AuthServiceService) { }

  getTasks(idProject):Observable<any>{
    var longProject = Number(idProject);
    var token = this.authService.getJwtToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${baseUrl}task/${longProject}`,{headers: headers});
  }
}
