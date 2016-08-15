import {Injectable} from '@angular/core';
import {Action, SyncNext} from 'walts';

import {AppState} from './app.store';
import {StyleParser} from './style-parser.service';
import {OFocusStyle} from './ofocus-style';
import {StyleBuilder} from './style-builder.service';

@Injectable()
export class AppActions extends Action<AppState> {

  constructor(private parser: StyleParser,
              private builder: StyleBuilder) {
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

  updateStyle(path: string[], value: any): SyncNext<AppState> {
    return (state) => {
      path.reduce((obj, key, idx) => {
        if (path.length - 1 === idx) {
          obj[key] = value;
        }
        return obj[key];
      }, state.style as any);
      return state;
    };
  }

  exportStyle(): Promise<SyncNext<AppState>> {
    return new Promise<SyncNext<AppState>>((resolve) => {
      resolve((state) => {
        this.builder.build(state.style).then((plist: string) => {
          console.log(plist);
        });
        return state;
      });
    });
  }

}
