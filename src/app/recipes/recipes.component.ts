import { AfterContentInit, Component, OnInit } from '@angular/core';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, AfterContentInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // load/fetch recipes when Recipe page opens
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  // Use this life-cycle hook to make content go to top
  ngAfterContentInit() {
    document.documentElement.scrollTop = 0;
  }

}
