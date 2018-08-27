import { PartTwoComponent } from './part-two/part-two.component';
import { PartOneComponent } from './part-one/part-one.component';
import { SurveyTwoComponent } from './survey-two.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartThreeComponent } from './part-three/part-three.component';

@NgModule({
  exports: [
    SurveyTwoComponent,
    PartOneComponent,
    PartTwoComponent,
    PartThreeComponent
  ],
  declarations: [
    SurveyTwoComponent,
    PartOneComponent,
    PartTwoComponent,
    PartThreeComponent
  ],
  entryComponents: [
    SurveyTwoComponent,
    PartOneComponent,
    PartTwoComponent,
    PartThreeComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class SurveyTwoModule {}
