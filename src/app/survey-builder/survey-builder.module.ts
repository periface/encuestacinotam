import { SurveyBuilderComponentsModule } from './components/survey-builder.module';
import { SurveyServiceModule } from './services/survey-service.module';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [],
  imports: [SurveyServiceModule, SurveyBuilderComponentsModule],
  declarations: []
})
export class SurveyBuilderModule {}
