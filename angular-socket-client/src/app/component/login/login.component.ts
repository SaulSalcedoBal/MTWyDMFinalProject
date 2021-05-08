import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authSvc: AuthService, private router: Router, private oyenteSvc: DataService) {
 
  }

  

  sigIn(provider: string) {
    this.authSvc.loginOAuth2(provider)
      .then((user: any) => {
        console.log(`Usuario de OAuth2: ${JSON.stringify(user)}`);
        this.authSvc.login({ correo: user.email, apiKey: '6096291e29444f6cd0485c44' }).subscribe(async response => {
          await this.authSvc.setlocalStorage(response);
          console.log("send data sendSignIn");
          this.oyenteSvc.sendSignIn(
            user
          );
          this.router.navigate(['home']);
        }, err => {
          alert(err.error.response.msg);
        });
      })
      .catch((error) => {
        return {
          success: false,
          error
        }
      });
  }

  signUp(provider: string) {
    console.log("Autentificado con proveedor");
    this.authSvc.loginOAuth2(provider)
      .then((user: any) => {
        console.log('Autentificado por proveedor correctamente');
        this.router.navigate(['home']);
        this.oyenteSvc.sendSignUp(
          user
        );
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        alert("Ha ocurrido un error durante su registro.");
        return {
          success: false,
          error
        }
      });
  }

}