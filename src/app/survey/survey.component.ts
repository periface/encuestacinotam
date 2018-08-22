import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './survey.component.html'
})
export class SurveyComponent {
  /**
   *
   */
  constructor(private router: Router) {}
  goToStepOne() {
    this.router.navigate(['surveyOne']);
  }
}
