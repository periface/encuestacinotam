import { SecondSurveyComponent } from './second-survey/second-survey.component';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { FirstSurveyComponent } from './first-survey/first-survey.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EndComponent } from './end/end.component';
import { ThirdSurveyComponent } from './third-survey/third-survey.component';
@NgModule({
  exports: [
    SurveyComponent,
    FirstSurveyComponent,
    SecondSurveyComponent,
    EndComponent,
    ThirdSurveyComponent
  ],
  imports: [CommonModule, FormsModule, NgbModule],
  declarations: [
    SurveyComponent,
    FirstSurveyComponent,
    SecondSurveyComponent,
    ThirdSurveyComponent,
    EndComponent
  ],
  entryComponents: [
    SurveyComponent,
    FirstSurveyComponent,
    SecondSurveyComponent,
    ThirdSurveyComponent,
    EndComponent
  ]
})
export class SurveyModule {}
