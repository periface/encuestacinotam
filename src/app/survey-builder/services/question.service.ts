
import { Injectable } from '@angular/core';
import { QuestionBase } from '../models/question-base.model';
import { QuestionInfo } from '../models/question-info.model';
import { TextAreaQuestion } from '../components/question-textarea/question-textarea.component';
import { TextboxQuestion } from '../components/question-textbox/question-textbox';
import { CheckboxQuestion } from '../components/question-checkbox/question-checkbox.component';
import { RadioGrpQuestionGroup } from '../components/question-radiogrp/question-radiogrp.component';
import { CheckboxQuestionGroup } from '../components/question-checkbox-group/question-checkbox-group.component';

@Injectable()
export class QuestionService {

  private getQuestionsAndAnswers(
    input: QuestionInfo[],
    parsedAnswers: any
  ): QuestionBase<any>[] {
    const result: QuestionBase<any>[] = [];
    for (const property in parsedAnswers) {
      if (parsedAnswers.hasOwnProperty(property)) {
        // do stuff
        const elm = input.find(a => a.keyName === property);
        if (elm) {
          const inputElm = this.resolveQuestionType(
            elm,
            parsedAnswers[property]
          );
          if (inputElm) {
            result.push(inputElm);
          }
        }
      }
    }
    return result;
  }
  private getOnlyQuestions(input: QuestionInfo[]): QuestionBase<any>[] {
    const result: QuestionBase<any>[] = [];
    input.forEach(elm => {
      const inputElm = this.resolveQuestionType(elm);
      if (inputElm) {
        result.push(inputElm);
      }
    });
    return result;
  }
  private resolveQuestionType(elm: QuestionInfo, value?: any) {
    switch (elm.inputType) {
      case 'textarea':
        return new TextAreaQuestion({
          key: elm.keyName,
          label: elm.label,
          order: elm.order,
          colSize: 'col-lg-12',
          required: elm.required,
          value: value || null,
          id: elm.id
        });
      case 'textbox':
        return new TextboxQuestion({
          key: elm.keyName,
          label: elm.label,
          order: elm.order,
          colSize: 'col-lg-12',
          required: elm.required,
          value: value || null,
          id: elm.id
        });
      case 'checkbox':
        return new CheckboxQuestion({
          key: elm.keyName,
          label: elm.label,
          order: elm.order,
          colSize: 'col-lg-12',
          required: elm.required,
          value: value || null,
          id: elm.id
        });
      case 'radiogrp':
        return new RadioGrpQuestionGroup({
          key: elm.keyName,
          label: elm.label,
          order: elm.order,
          colSize: 'col-lg-12',
          required: elm.required,
          value: value || null,
          radios: this.getOptions(elm.options),
          id: elm.id
        });
      case 'checkboxgrp':
        return new CheckboxQuestionGroup({
          key: elm.keyName,
          label: elm.label,
          order: elm.order,
          colSize: 'col-lg-12',
          required: elm.required,
          value: value || null,
          checkboxes: this.getOptions(elm.options, true),
          id: elm.id
        });
      default:
        break;
    }
  }
  getOptions(options: QuestionInfo[], isCheckbox?: boolean): Array<any> {
    const result = [];
    // if (isCheckbox) {
    //   for (let option = 0; option < options.length; option++) {
    //     const element = options[option];
    //     result.push({
    //       key: element.key,
    //       value: element.value,
    //       displayName: element.displayName
    //     });
    //   }
    // } else {
    //   for (let option = 0; option < options.length; option++) {
    //     const element = options[option];
    //     result.push({
    //       key: element.key,
    //       value: element.value,
    //       displayName: element.displayName
    //     });
    //   }
    // }
    return result;
  }
}