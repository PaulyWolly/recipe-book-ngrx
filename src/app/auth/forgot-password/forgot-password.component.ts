import { Component } from '@angular/core';
import { AuthResponseData } from '../store/auth.effects';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  forgotPassword(email: any) {

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === '') {
      alert('Please enter an email!');
    }

    // Firebase API Key
    const APIKey = environment.firebaseAPIKey;
    const fbUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + APIKey;

    // console.log('email: ', email);

    this.http
      .post(
        fbUrl,
        {
          email,
          requestType: 'PASSWORD_RESET'
        }
      )
      .subscribe((theEmail) => {
        console.log('email in subscribe: ', theEmail);
        alert('Password reset has been sent to your email. If you don\'t see the reset email in your INBOX then please check your SPAM folder.');
        this.route.navigate(['/auth']);
      });
  }
}
