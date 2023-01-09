import { Component, OnDestroy, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

import { DOCUMENT, ViewportScroller } from '@angular/common';

import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { Validators, Editor, Toolbar } from 'ngx-editor';

import jsonDoc from './doc';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  editordoc = jsonDoc;

  // editor: Editor;
  // toolbar: Toolbar = [
  //   ['bold', 'italic'],
  //   ['underline', 'strike'],
  //   ['code', 'blockquote'],
  //   ['ordered_list', 'bullet_list'],
  //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //   ['link', 'image'],
  //   ['text_color', 'background_color'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify'],
  // ];

  // form = new FormGroup({
  //   editorContent: new FormControl(
  //     { value: jsonDoc, disabled: false },
  //     Validators.required()
  //   ),
  // });

  // get doc(): AbstractControl {
  //   return this.form.get('editorContent');
  // }

  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller
  ) { }

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
    this.onScrollToTop();

    // this.editor = new Editor();
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  ngOnDestroy(): void {
    // this.editor.destroy();
  }
}
