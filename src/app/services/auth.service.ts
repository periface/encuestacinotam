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
}
