import { HelpDataSurveyTwo } from './../../utils/help-data-surveytwo';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Utils } from '../../utils/utils';
import { User } from 'firebase';
import { HelpDataReasons } from '../../utils/help-data-reasons-stwo';
import { SurveyTwo } from '../models/survey-two.model';

@Component({
  templateUrl: './part-two.component.html'
})
export class PartTwoComponent {
  user: User;
  userResponse: SurveyTwo;
  saving = false;
  groups = HelpDataSurveyTwo;
  groupsReasons = HelpDataReasons;
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
        console.log(data);
        const arr = Utils.snapshotToArray(data);
        if (arr.length) {
          this.userResponse = arr[0] as SurveyTwo;
        }
      });
    });
  }
  save() {
    this.saving = true;
    const data = this.getAreas();
    const dataYesOrNo = this.getReasons();
    setTimeout(() => {
      this.userResponse.Areas = data;
      this.userResponse.Reasons = dataYesOrNo;
      this.surveyService.saveSurveyTwo(this.userResponse);
      this.saving = false;
      this.route.navigate(['pasoTres']);
    }, 3000);
  }
  goBack() {
    this.route.navigate(['pasoUno']);
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
      data.push({
        group: element.name,
        elements: selected
      });
    }
    return data;
  }
  getAreas(): any[] {
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
