import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SurveyModule } from './survey/survey.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SurveyTwoModule } from './survey-two/survey-two.module';
import { UsersComponent } from './users/users.component';
import { ResultsComponent } from './results/results.component';
@NgModule({
  declarations: [AppComponent, UsersComponent, ResultsComponent],
  entryComponents: [UsersComponent, ResultsComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AccountModule,
    SurveyModule,
    SurveyTwoModule,
    AngularFireModule.initializeApp(environment.fireabase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
