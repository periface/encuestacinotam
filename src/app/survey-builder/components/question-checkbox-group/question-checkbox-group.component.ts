import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionBase } from '../../models/question-base.model';

export class CheckboxQuestionGroup extends QuestionBase<string> {
  controlType = 'checkboxgrp';
  options: {
    key?: string;
    label?: string;
    shouldSelectOne?: boolean;
    checkboxes: { key: string; value: boolean; displayName: string }[];
  } = {
    checkboxes: []
  };

  constructor(options: any = {}) {
    super(options);
    this.options = options || {
      checkboxes: []
    };
  }
  buildForm(group: FormGroup) {
    this.options.checkboxes.forEach(elm => {
      group[elm.key] = new FormControl(elm.value || '');
    });
  }
  validate(form: FormGroup) {
    return true;
  }
}
