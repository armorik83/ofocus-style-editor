import {Component} from '@angular/core';

import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';
import {AppStore} from './app.store';

@Component({
  selector: 'se-app',
  template: `
    <h1>Import ofocus-style</h1>
    <input
      type="file"
      (result)="onResultInputFile($event)"
    >
    <button
      (click)="onClickImport()"
      [attr.disabled]="disableImport ? true : null"
    >
      Import
    </button>
  `
})
export class AppComponent {

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: AppStore) {
    this.store.observable.subscribe((s) => {
      console.log(s);
    });
  }

  onResultInputFile(result: string | null): void {
    this.dispatcher.emit(this.actions.importStyle(result));
  }

  onClickImport(): void {
    console.log(`onClickImport`);
  }

}
