import { SurveyService } from './../../services/survey.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Utils } from '../../utils/utils';
import { SurveyOne } from '../models/survey-one.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelpData } from '../../utils/help-data';
@Component({
  templateUrl: './second-survey.component.html'
})
export class SecondSurveyComponent implements OnInit {
  userResponse: SurveyOne;
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
  ) {}
  ngOnInit(): void {
    this.authService.user.subscribe(usr => {
      this.user = usr;
      this.surveyService.getUserSurvey(usr.uid).then(data => {
        const arr = Utils.snapshotToArray(data);
        if (arr.length) {
          this.userResponse = arr[0] as SurveyOne;
          this.checkSelected();
        }
      });
    });
  }
  private checkSelected() {}
  get posgradoPorQue(): boolean {
    return (
      this.userResponse.Posgrado === '1' || this.userResponse.Posgrado === '2'
    );
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
    this.userResponse.Areas = data;
    this.surveyService.saveSurvey(this.userResponse);
    this.router.navigate(['surveyThree']);
    this.saving = false;
  }
}
