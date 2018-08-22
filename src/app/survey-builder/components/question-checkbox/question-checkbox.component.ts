import { QuestionBase } from '../../models/question-base.model';

export class CheckboxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  options:  { value: boolean; displayName: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
