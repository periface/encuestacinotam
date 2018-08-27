import { AuthService } from './../../services/auth.service';
import { SurveyTwo } from './../models/survey-two.model';
import { Component } from '@angular/core';
import { User } from 'firebase';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { Utils } from '../../utils/utils';

@Component({
  templateUrl: './part-one.component.html'
})
export class PartOneComponent {
  user: User;
  userResponse: SurveyTwo = new SurveyTwo();
  saving: boolean;
  isPosgradoValidCheck: boolean;
  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private auth: AuthService
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
  async save() {
    this.saving = true;
    this.userResponse.UserId = this.user.uid;
    this.userResponse.Email = this.user.email;
    setTimeout(async () => {
      console.log(this.userResponse);
      await this.surveyService.saveSurveyTwo(this.userResponse);
      this.saving = false;
      this.router.navigate(['pasoDos']);
    }, 2000);
    console.log(this.userResponse);
  }
  get isPosgradoValid(): boolean {
    if (
      this.userResponse.Posgrado === '1' ||
      this.userResponse.Posgrado === '2'
    ) {
      if (
        this.userResponse.PosgradoPorQue === '' ||
        this.userResponse.PosgradoPorQue === undefined
      ) {
        return false;
      }
      return true;
    }
    return true;
  }

  get requiresAreaSelect(): boolean {
    return this.userResponse.Escolaridad === '1';
  }
  get requiresAreaSpecific(): boolean {
    return (
      this.userResponse.Escolaridad === '2' ||
      this.userResponse.Escolaridad === '3' ||
      this.userResponse.Escolaridad === '4'
    );
  }
  get requiresProfesionalSpecific(): boolean {
    return this.userResponse.EscolaridadProfesional === '2';
  }
  get IsAreaValid(): boolean {
    console.log(this.userResponse.Area);
    return (
      this.userResponse.Area !== undefined && this.userResponse.Area !== ''
    );
  }
  get requiresProfesionalSpecificIsValid(): boolean {
    return (
      this.userResponse.EscolaridadSpecifica !== undefined &&
      this.userResponse.EscolaridadSpecifica !== ''
    );
  }
  get requiresOtherFromAreaSelectorIsValid(): boolean {
    return (
      this.userResponse.EscolaridadProfesionalOtra !== undefined &&
      this.userResponse.EscolaridadProfesionalOtra !== ''
    );
  }
}
