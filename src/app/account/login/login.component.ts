import { SurveyService } from './../../services/survey.service';
import { LoginModel } from './../models/login.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute
  ) {}
  async login() {
    try {
      this.loading = true;
      this.user.password = '123qwe';
      await this.authService.login(this.user);
      this.loading = false;
      this.checkLogin();
    } catch (err) {
      this.authService.addUser({
        email: this.user.email,
        password: '123qwe'
      });
      this.checkLogin();
    }
  }
  ngOnInit(): void {}
  private checkLogin() {
    const survey = this.activatedRoute.snapshot.params.survey;
    this.authService.user.subscribe(usr => {
      if (usr) {
        if (survey === 'encuesta') {
          this.router.navigate(['encuesta']);
        } else {
          this.router.navigate(['survey']);
        }
      }
    });
  }
}
