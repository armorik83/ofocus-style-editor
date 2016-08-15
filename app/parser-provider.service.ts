import {Injectable} from '@angular/core';
import * as plist from 'plist';

export class Parser {

  parse(source: string): Promise<Object> {;
    return Promise.resolve(plist.parse(source) as Object);
  }

}

@Injectable()
export class ParserProvider {

  getParser(): Parser {
    return new Parser();
  }

}
