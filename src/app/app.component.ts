import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

import { DOCUMENT, ViewportScroller } from '@angular/common';

import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data: { id: number, text: string }[] = [];

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller
  ) { }


  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');

    for (let i = 0; i < 15; i++) {
      this.data.push({ id: ( i + 1), text: environment.text });
    }
  }

  trackByIdFn(_: number, data: { id: number, text: string }): number {
    return data.id;
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
