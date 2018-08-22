import { QuestionBase } from '../../models/question-base.model';
export class TextAreaQuestion extends QuestionBase<string> {
  controlType = 'textarea';
  type: string;
  /**
   *
   */
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
