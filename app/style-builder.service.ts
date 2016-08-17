import {Injectable} from '@angular/core';
import {BuilderProvider, Builder} from './builder-provider.service';

@Injectable()
export class StyleBuilder {

  private builder: Builder;

  constructor(private builderProvider: BuilderProvider) {
    this.builder = builderProvider.getBuilder();
  }

  build(obj: Object): Promise<string> {
    return this.builder.build(obj).then((result: string) => {
      const tmp1 = result.replace(/<integer>/g, '<real>');
      const tmp2 = tmp1.replace(/<\/integer>/g, '</real>');

      let memIdx: number;
      const tmp3 = tmp2.split('\n').map((line, i) => {
        if (line.includes('CTFeatureSelectorIdentifier') || line.includes('CTFeatureTypeIdentifier')) {
          memIdx = i;
        }
        if (memIdx + 1 === i) {
          return line.replace(/real/g, 'integer');
        }
        return line;
      });

      const tmp4 = tmp3.map((line, i) => {
        let key = '';
        if (line.includes('key') && tmp3[i + 1].includes('key')) {
          const matchies = line.match(/<key>(.*)<\/key>/);
          if (Array.isArray(matchies) && 2 <= matchies.length) {
            key = matchies[1];
          }
        }
        if (key === 'flagImageNameSuffix') {
          return `${line}\n<string></string>`;
        }
        return line;
      });

      return tmp4.join('\n');
    });
  }

}
