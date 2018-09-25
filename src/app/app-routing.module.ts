import { PartThreeComponent } from './survey-two/part-three/part-three.component';
import { SurveyTwoComponent } from './survey-two/survey-two.component';
import { LoginComponent } from './account/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstSurveyComponent } from './survey/first-survey/first-survey.component';
import { SurveyComponent } from './survey/survey.component';
import { SecondSurveyComponent } from './survey/second-survey/second-survey.component';
import { EndComponent } from './survey/end/end.component';
import { ThirdSurveyComponent } from './survey/third-survey/third-survey.component';
import { PartOneComponent } from './survey-two/part-one/part-one.component';
import { PartTwoComponent } from './survey-two/part-two/part-two.component';
import { UsersComponent } from './users/users.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:survey',
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
    path: 'surveyThree',
    component: ThirdSurveyComponent
  },
  {
    path: 'end',
    component: EndComponent
  },
  {
    path: 'encuesta',
    component: SurveyTwoComponent
  },
  {
    path: 'pasoUno',
    component: PartOneComponent
  },
  {
    path: 'pasoDos',
    component: PartTwoComponent
  },
  {
    path: 'pasoTres',
    component: PartThreeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'resultados',
    component: ResultsComponent
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
