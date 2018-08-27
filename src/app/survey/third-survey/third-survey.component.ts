import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { HelpDataSp } from '../../utils/help-data-sp';
import { SurveyOne } from '../models/survey-one.model';
import { Utils } from '../../utils/utils';
@Component({
  templateUrl: './third-survey.component.html'
})
export class ThirdSurveyComponent {
  groups = HelpDataSp;

  saving = false;
  user: User;
  userResponse: SurveyOne;
  /**
   *
   */
  constructor(
    private router: Router,
    private surveyService: SurveyService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe(usr => {
      this.user = usr;
      if (!this.user) {
        this.router.navigate(['login']);
      }
      this.surveyService.getUserSurvey(this.user.uid).then(data => {
        const arr = Utils.snapshotToArray(data);
        if (arr.length) {
          this.userResponse = arr[0] as SurveyOne;
        }
      });
    });
  }
  goBack() {
    this.router.navigate(['surveyTwo']);
  }
  save() {
    this.saving = true;
    const data = [];
    for (let index = 0; index < this.groups.length; index++) {
      const element = this.groups[index];
      const selected = element.options.filter(opt => opt.checked).map(opt => {
        return {
          value: opt.value,
          name: opt.name
        };
      });
      if (element.requiresOne && !selected.length) {
        alert('Por favor seleccione al menos una materia de ' + element.name);
        this.saving = false;
        return false;
      } else {
        data.push({
          group: element.name,
          elements: selected
        });
      }
    }
    this.userResponse.Especialidad = data;
    this.userResponse.Ended = true;
    this.surveyService.saveSurvey(this.userResponse);
    this.router.navigate(['end']);
    this.saving = false;
  }
}
