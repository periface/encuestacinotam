import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  template: `
      <div class="card center vertical">
        <h1 class="text-center">¡Muchas gracias por su colaboración!</h1>
        <p class="text-center">
        Agradecemos su valiosa opinión especializada que contribuye a asegurar la pertinencia de este programa de posgrado.
        </p>
        <p class="text-center">
        <button (click)="end()" class="btn btn-success">
          Finalizar
        </button>
        </p>
      </div>`
})
export class EndComponent {
  /**
   *
   */
  constructor(private auth: AuthService, private router: Router) {}
  end() {
    console.log('end');
    this.auth.logout();
    this.router.navigate(['']);
  }
}
