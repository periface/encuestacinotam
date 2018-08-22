import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [DynamicFormQuestionComponent],
  imports: [CommonModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [DynamicFormQuestionComponent]
})
export class SurveyBuilderComponentsModule {}
