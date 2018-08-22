import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { User } from 'firebase';
import { Utils } from '../../utils/utils';
import { SurveyOne } from '../models/survey-one.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelpData } from '../../utils/help-data';
@Component({
  templateUrl: './third-survey.component.html'
})
export class ThirdSurveyComponent {
  groups = HelpData;

  saving: boolean;
  user: User;
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
    });
  }
  goBack() {
    this.router.navigate(['surveyOne']);
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
    this.surveyService.getUserSurvey(this.user.uid).then(snapShot => {
      const arr = Utils.snapshotToArray(snapShot);
      if (arr.length) {
        const userResponse = arr[0] as SurveyOne;
        userResponse.Areas = data;
        userResponse.Ended = true;
        this.surveyService.saveSurvey(userResponse);
        this.router.navigate(['end']);
      }
      this.saving = false;
    });
  }
}
