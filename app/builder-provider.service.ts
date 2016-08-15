import {Injectable} from '@angular/core';
import * as plist from 'plist';

export class Builder {

  build(obj: Object): Promise<string> {
    return Promise.resolve(plist.build(obj));
  }

}

@Injectable()
export class BuilderProvider {

  getBuilder(): Builder {
    return new Builder();
  }

}
