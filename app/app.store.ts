import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {State, Store} from 'walts';

import {AppDispatcher} from './app.dispatcher';
import {OFocusStyle} from './ofocus-style';

export class AppState extends State {
  style: OFocusStyle;
}

const INIT_STATE: AppState = {
  style: {} as OFocusStyle
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(protected dispatcher: AppDispatcher) {
    super(INIT_STATE, dispatcher);
  }

  getColorPalette(): Observable<{[key: string]: any}> {
    return this.observable.map((state) => {
      const palette = state.style.colorPalette;
      return palette ? palette : {};
    });
  }

  getColorPaletteKeys(): Observable<string[]> {
    return this.getColorPalette().map((palette) => {
      return Object.keys(palette);
    });
  }

}
