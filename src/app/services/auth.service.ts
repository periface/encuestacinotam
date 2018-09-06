import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  loading: boolean;
  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.user;
  }
  login(input: {
    email: string;
    password: string;
  }): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(
      input.email,
      input.password
    );
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  async addUsers(bulkData: any[]) {
    for (let index = 0; index < bulkData.length; index++) {
      try {
        const element = bulkData[index];
        const response = await this.afAuth.auth.createUserWithEmailAndPassword(
          element,
          '123qwe'
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
  async addUser({ email, password }) {
    try {
      const response = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
    }
  }
}
