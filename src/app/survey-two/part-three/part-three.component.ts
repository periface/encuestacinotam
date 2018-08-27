import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Utils } from '../../utils/utils';
import { SurveyTwo } from '../models/survey-two.model';
import { HelpDataReasons } from '../../utils/help-data-reasons-stwo';

@Component({
  templateUrl: './part-three.component.html'
})
export class PartThreeComponent {
  user: User;
  userResponse: SurveyTwo;
  groupsReasons = HelpDataReasons;
  saving = false;
  /**
   *
   */
  constructor(
    private auth: AuthService,
    private surveyService: SurveyService,
    private route: Router
  ) {
    this.auth.user.subscribe(usr => {
      this.user = usr;
      this.surveyService.getUserSurveyTwo(usr.uid).then(data => {
        const arr = Utils.snapshotToArray(data);
        if (arr.length) {
          this.userResponse = arr[0] as SurveyTwo;
        }
      });
    });
  }
  goBack() {
    this.route.navigate(['pasoDos']);
  }
  save() {
    this.saving = true;
    const data = this.getReasons();
    setTimeout(() => {
      this.userResponse.ReasonsAnimal = data;
      this.surveyService.saveSurveyTwo(this.userResponse);
      this.saving = false;
      this.route.navigate(['end']);
    }, 3000);
  }
  getReasons(): any[] {
    const data = [];
    for (let index = 0; index < this.groupsReasons.length; index++) {
      const element = this.groupsReasons[index];
      const selected = element.options.filter(opt => opt.checked).map(opt => {
        return {
          value: opt.value,
          name: opt.name
        };
      });
      if (element.requiresOne && !selected.length) {
        alert('Por favor seleccione al menos una materia de ' + element.name);
        this.saving = false;
        return [];
      } else {
        data.push({
          group: element.name,
          elements: selected
        });
      }
    }
    return data;
  }
}
