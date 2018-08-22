import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionBase } from '../../models/question-base.model';

export class RadioGrpQuestionGroup extends QuestionBase<string> {
  controlType = 'radiogrp';
  options: {
    key?: string;
    label?: string;
    shouldSelectOne?: boolean;
    radios: { value: boolean; displayName: string }[];
  } = {
    radios: []
  };

  constructor(options: any = {}) {
    super(options);
    this.options = options || {
      radios: []
    };
  }
  validate(form: FormGroup) {
    return true;
  }
}
