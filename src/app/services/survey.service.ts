import { SurveyTwo } from './../survey-two/models/survey-two.model';
import { Injectable } from '@angular/core';
import { SurveyOne } from '../survey/models/survey-one.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  responses: AngularFireList<SurveyOne>;
  surveyTwoResponses: AngularFireList<SurveyTwo>;
  constructor(public db: AngularFireDatabase) {
    this.responses = db.list('/responses');
    this.surveyTwoResponses = db.list('responses-candidatos');
  }
  saveSurvey(data: any) {
    if (data.key) {
      this.responses.update(data.key, data);
    } else {
      this.responses.push(data);
    }
  }
  getUserSurvey(uId: string) {
    return this.responses.query
      .orderByChild('UserId')
      .equalTo(uId)
      .once('value');
  }

  saveSurveyTwo(data: any) {
    if (data.key) {
      this.surveyTwoResponses.update(data.key, data);
    } else {
      this.surveyTwoResponses.push(data);
    }
  }
  getUserSurveyTwo(uId: string) {
    return this.surveyTwoResponses.query
      .orderByChild('UserId')
      .equalTo(uId)
      .once('value');
  }
}
