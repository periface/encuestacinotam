export class QuestionInfo {
  label: string | undefined;
  inputType: string | undefined;
  order: number | undefined;
  additionalOptions: string | undefined;
  required: boolean | undefined;
  keyName: string | undefined;
  surveyTypeId: number | undefined;
  options: QuestionInfo[] | undefined;
  id: number | undefined;

  constructor(data?: QuestionInfo) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
export class QuestionOption {
  value: string | undefined;
  key: string | undefined;
  displayName: string | undefined;
  selected: boolean | undefined;
  questionInfoId: number | undefined;
  id: number | undefined;

  constructor(data?: QuestionOption) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
