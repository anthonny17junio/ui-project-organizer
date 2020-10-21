import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient, private authService:AuthServiceService) { }

  getProjects(idUser):Observable<any>{
    var longUser = Number(idUser);
    var token = this.authService.getJwtToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${baseUrl}project/${longUser}`,{headers: headers});
  }
}
