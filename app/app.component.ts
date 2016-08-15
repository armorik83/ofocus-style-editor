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
      [attr.disabled]="importStr === '' ? true : null"
    >
      Import
    </button>
    
    <div *ngIf="0 < paletteKeys.length">
      <h2>Palette</h2>
      <se-palette
        *ngFor="let key of paletteKeys"
        [key]="key"
        [value]="palette[key]"
      ></se-palette>
    </div>
  `
})
export class AppComponent {

  private palette: {[key: string]: any};
  private paletteKeys: string[];
  private importStr = '';

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: AppStore) {
    this.store.getColorPalette()    .subscribe((s) => this.palette = s);
    this.store.getColorPaletteKeys().subscribe((s) => this.paletteKeys = s);
  }

  onResultInputFile(result: string | null): void {
    this.importStr = result || '';
  }

  onClickImport(): void {
    if (this.importStr === '') {
      return;
    }

    this.dispatcher.emit(this.actions.importStyle(this.importStr));
    this.importStr = '';
  }

}
