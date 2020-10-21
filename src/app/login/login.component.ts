import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router} from '@angular/router';
import { Tokens } from '../models/tokens';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  username:String;

  constructor(private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result => {
        this.authService.doLoginUser(new Tokens(result.access_token,result.refresh_token))
        this.router.navigate(['/projects']);
      }
      ,err => {
        if(err.status === 401){
          alert("Incorrect credentials");
        }
      })
    }
  }
}
