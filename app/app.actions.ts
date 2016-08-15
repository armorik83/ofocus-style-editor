import {Injectable} from '@angular/core';
import {Action, SyncNext} from 'walts';

import {AppState} from './app.store';
import {StyleParser} from './style-parser.service';
import {OFocusStyle} from './ofocus-style';

@Injectable()
export class AppActions extends Action<AppState> {

  constructor(private parser: StyleParser) {
    super();
  }

  importStyle(styleString: string): Promise<SyncNext<AppState>> {
    return new Promise<SyncNext<AppState>>((resolve) => {
      this.parser.parse(styleString).then((styleObj: OFocusStyle) => {
        resolve((state) => ({
          style: styleObj
        } as AppState));
      });
    });
  }

}
