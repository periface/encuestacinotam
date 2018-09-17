import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  template: `<div class="cintilla-container">
  <div class="cintilla-izquierda"></div>
  <div class="cintilla-derecha"></div>
  <div class="cintilla"></div>
</div>
<div class="bg-container"></div>
<div class="logo-container">
  <img src="/assets/img/logouat.JPG" />
</div>
<div class="logo-vet-container">
  <img src="/assets/img/logovet.JPG" />
</div>
<div class="title-container">
  <h1 class="text-center">Encuestas Cinotam</h1>
</div>
<br>
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
