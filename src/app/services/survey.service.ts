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
  constructor(public db: AngularFireDatabase) {
    this.responses = db.list('/responses');
  }
  saveSurvey(data: SurveyOne) {
    console.log(data);
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
}
