import { SurveyService } from './../../services/survey.service';
import { LoginModel } from './../models/login.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from '../../utils/utils';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   *
   */
  user: LoginModel = new LoginModel();
  loading: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private surveyService: SurveyService
  ) {
    this.authService.user.subscribe(usr => {
      console.log(usr);
      if (usr) {
        this.surveyService.getUserSurvey(usr.uid).then(snapShot => {
          const data = Utils.snapshotToArray(snapShot);
          if (!data.length) {
            this.router.navigate(['survey']);
          } else {
            alert('Usted ya ha contestado esta encuesta...');
          }
        });
      }
    });
  }
  async login() {
    this.loading = true;
    await this.authService.login(this.user).catch(err => {
      alert('Error de inicio de sesión');
    });
    this.loading = false;
  }
  ngOnInit(): void {}
}
