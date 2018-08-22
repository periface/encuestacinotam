import { QuestionControlService } from './question-control.service';
import { QuestionService } from './question.service';
import { NgModule } from '@angular/core';
import { SurveyBuilderComponentsModule } from '../components/survey-builder.module';

@NgModule({
  exports: [],
  imports: [],
  declarations: [],
  providers: [QuestionService, QuestionControlService]
})
export class SurveyServiceModule {}
