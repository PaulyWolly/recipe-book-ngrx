import { Component } from '@angular/core';
import { AuthResponseData } from '../store/auth.effects';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: any;
  password: any;
  APIKey: string;
  error: any = '';

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  forgotPassword(email: any) {

    // Firebase API Key
    const APIKey = environment.firebaseAPIKey;
    const fbUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + APIKey;

    //console.log('email: ', email);

    this.http
      .post(
        fbUrl,
        {
          email: email,
          requestType: 'PASSWORD_RESET'
        }
      )
      .subscribe((theEmail) => {
        console.log("email in subscribe: ", theEmail)
        alert("Password reset has been sent to your email. If you don't see the reset email in your INBOX then please check your SPAM folder.")
        this.route.navigate(['/auth']);
      })

  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APIKey,
  //       {
  //         email,
  //         returnSecureToken: true
  //       }
  //     )
  //     .pipe(
  //       catchError(this.error),
  //       tap(resData => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // handleAuthentication(email: any, localId: any, idToken: any, arg3: number) {
  //   throw new Error('Method not implemented.');
  // }

}




  // forgotPassword(email: string) {

    // Login URL from Firebase Auth REST API
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

    // Firebase API Key
  //   let APIKey = 'AIzaSyCLaenXEVu38_ocSG1AtA22HfgdlTptvOU';

  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap(resData => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

}
