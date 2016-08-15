import { Injectable } from '@angular/core';
import { Action, Next } from 'walts';

import { AppState } from './app.store';

@Injectable()
export class AppActions extends Action<AppState> {

  constructor() {
    super();
  }

  importStyle(xmlString: string | null): Next<AppState> {
    return (state) => {
      if (!xmlString) {
        return {
          xml: ''
        } as AppState;
      }

      return {
        xml: xmlString
      } as AppState;
    };
  }

}
