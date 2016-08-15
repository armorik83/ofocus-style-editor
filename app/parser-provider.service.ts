import {Injectable} from '@angular/core';
import * as plist from 'plist';

export class Parser {

  parse(source: string): Promise<Object> {
    const parser = new DOMParser();
    return Promise.resolve(plist.parse(source) as Object);
  }

}

@Injectable()
export class ParserProvider {

  getParser(): Parser {
    return new Parser();
  }

}
