import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './survey-two.component.html',
  selector: 'app-survey-two'
})
export class SurveyTwoComponent {
  /**
   *
   */
  constructor(private router: Router) {


  }
  goToStepOne() {
    this.router.navigate(['pasoUno']);
  }
}
