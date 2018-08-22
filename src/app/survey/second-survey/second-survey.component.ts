import { SurveyService } from './../../services/survey.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Utils } from '../../utils/utils';
import { SurveyOne } from '../models/survey-one.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  templateUrl: './second-survey.component.html'
})
export class SecondSurveyComponent implements OnInit {
  userResponse: SurveyOne;
  /**
   *
   */
  constructor(
    private surveyService: SurveyService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.auth.user.subscribe(usr => {
      this.surveyService.getUserSurvey(usr.uid).then(data => {
        const arr = Utils.snapshotToArray(data);
        if (arr.length) {
          this.userResponse = arr[0] as SurveyOne;
        }
      });
    });
  }
  get posgradoPorQue(): boolean {
    return (
      this.userResponse.Posgrado === '1' || this.userResponse.Posgrado === '2'
    );
  }
}
