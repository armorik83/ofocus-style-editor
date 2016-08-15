import {Injectable} from '@angular/core';
import {ParserProvider} from "./parser-provider.service";

@Injectable()
export class StyleParser {

  private parser: any;

  constructor(private parserProvider: ParserProvider) {
    this.parser = parserProvider.getParser();
  }

  parse(styleString: string): Promise<Object> {
    if (!styleString) {
      return Promise.resolve({});
    }

    return this.parser.parse(styleString).then((result: Object) => {
      return result;
    });
  }

}
