import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../models/question-base.model';

@Injectable()
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};
    questions.forEach(question => {
      if (question.buildForm) {
        question.buildForm(group);
      }
    });
    return new FormGroup(group);
  }
}
