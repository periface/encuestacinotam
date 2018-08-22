import { Component, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../models/question-base.model';
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements AfterViewInit {
  @Input()
  question: QuestionBase<any>;
  @Input()
  form: FormGroup;
  get isValid() {
    return this.question.validate(this.form);
  }

  /**
   *
   */
  constructor() {}
  ngAfterViewInit(): void {}
}
