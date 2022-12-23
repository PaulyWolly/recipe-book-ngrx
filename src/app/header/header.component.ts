import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isAuthenticated = false;
  private userSub: Subscription;
  loggedInUser: any;
  loginEmail = '';

  constructor(
    private store: Store<fromApp.AppState>,
    private route: Router
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        // console.log(!user);
        // console.log(!!user);
        this.getEmailFromLocalStorage();
      });
  }

  ngAfterViewInit() {
    this.route.navigate([this.route.url]);
    this.getEmailFromLocalStorage();

  }

  getEmailFromLocalStorage() {

    const emailLS = localStorage.getItem('email');
    // const newObject = JSON.parse(loginEmail);
    this.loginEmail = emailLS;

  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    localStorage.clear();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    localStorage.clear();
  }
}
