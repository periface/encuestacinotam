import { FormGroup, FormControl, Validators } from '@angular/forms';

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  colSize: string;
  id: number;
  childElements: QuestionBase<any>[];
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      colSize?: string;
      id?: number;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.colSize = options.colSize || 'col-sm-12';
    this.id = options.id || 0;
  }
  buildForm(group?: FormGroup) {
    // Each type of input should be able to decide in which way it wants to be created

    group[this.key] = this.required
      ? new FormControl(this.value || '', Validators.required)
      : new FormControl(this.value || '');
  }
  validate(form?: FormGroup): boolean {
    if (form.controls[this.key]) {
      return form.controls[this.key].valid;
    }
    return false;
  }
}
