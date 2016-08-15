import {Injectable} from '@angular/core';
import {BuilderProvider, Builder} from "./builder-provider.service";

@Injectable()
export class StyleBuilder {

  private builder: Builder;

  constructor(private builderProvider: BuilderProvider) {
    this.builder = builderProvider.getBuilder();
  }

  build(obj: Object): Promise<string> {
    return this.builder.build(obj).then((result: string) => {
      const tmp = result.replace(/<integer>/g, '<real>');
      return tmp.replace(/<\/integer>/g, '</real>');
    });
  }

}
