import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from './../../services/auth.service';
import { SurveyService } from './../../services/survey.service';
import { SurveyOne } from './../models/survey-one.model';
import { Component } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
  templateUrl: './first-survey.component.html'
})
export class FirstSurveyComponent {
  user: User;
  userResponse: SurveyOne = new SurveyOne();
  saving: boolean;
  isPosgradoValidCheck: boolean;
  /**
   *
   */
  constructor(
    private surveyService: SurveyService,
    private authService: AuthService,
    private router: Router
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
  async save() {
    this.saving = true;
    this.userResponse.UserId = this.user.uid;
    this.userResponse.Email = this.user.email;

    // if (
    //   this.requiresAreaSelect &&
    //   !this.requiresProfesionalSpecific &&
    //   !this.requiresProfesionalSpecificIsValid
    // ) {
    //   alert('Especifique, "Pregunta 3.1" ');
    //   this.saving = false;
    //   this.userResponse.PosgradoPorQue = '';
    //   return false;
    // } else {
    //   if (
    //     this.requiresAreaSelect &&
    //     this.userResponse.EscolaridadProfesional === undefined
    //   ) {
    //     alert('Especifique, "Pregunta 3.1" ');
    //     this.saving = false;
    //     this.userResponse.PosgradoPorQue = '';
    //     return false;
    //   }
    // }

    // if (this.requiresAreaSpecific && !this.requiresProfesionalSpecificIsValid) {
    //   alert('Especifique, "Pregunta 3.1" ');
    //   this.saving = false;
    //   this.userResponse.PosgradoPorQue = '';
    //   return false;
    // }
    if (!this.IsAreaValid) {
      alert('Área, "Pregunta 4.1" ');
      this.saving = false;
      return false;
    }
    if (!this.isPosgradoValid) {
      alert('Especifique por que, "Pregunta 5.1" ');
      this.saving = false;
      this.userResponse.PosgradoPorQue = '';
      return false;
    }
    setTimeout(async () => {
      await this.surveyService.saveSurvey(this.userResponse);
      this.saving = false;
      this.router.navigate(['surveyTwo']);
    }, 2000);
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
    return this.userResponse.Escolaridad === '2';
  }
  get requiresAreaSpecific(): boolean {
    return (
      this.userResponse.Escolaridad === '5' ||
      this.userResponse.Escolaridad === '3' ||
      this.userResponse.Escolaridad === '4'
    );
  }
  get requiresProfesionalSpecific(): boolean {
    return this.userResponse.EscolaridadProfesional === '14';
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
