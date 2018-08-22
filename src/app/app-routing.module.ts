import { LoginComponent } from './account/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstSurveyComponent } from './survey/first-survey/first-survey.component';
import { SurveyComponent } from './survey/survey.component';
import { SecondSurveyComponent } from './survey/second-survey/second-survey.component';
import { EndComponent } from './survey/end/end.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'survey',
    component: SurveyComponent
  },
  {
    path: 'surveyOne',
    component: FirstSurveyComponent
  },
  {
    path: 'surveyTwo',
    component: SecondSurveyComponent
  },
  {
    path: 'end',
    component: EndComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
