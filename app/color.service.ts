import {Injectable} from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Injectable()
export class ColorService {

  fromRgba(obj: any): string {
    const color = tinycolor.fromRatio({
      r: obj.r,
      g: obj.g,
      b: obj.b
    });
    return color.toHexString();
  }

  fromHsba(obj: any): string {
    const color = tinycolor.fromRatio({
      h: obj.h,
      s: obj.s,
      v: obj.b
    });
    return color.toHexString();
  }

  fromGrayscale(obj: any): number {
    return obj.w;
  }

  toRgba(hexColor: string, alpha: number): any {
    const obj = tinycolor(hexColor).toRgb();
    obj.a     = alpha / 100;

    obj.r /= 255;
    obj.g /= 255;
    obj.b /= 255;

    return obj;
  }

  toHsba(hexColor: string, alpha: number): any {
    const obj = tinycolor(hexColor).toHsv() as any;

    obj.a    = alpha / 100;
    obj['b'] = obj.v;
    delete obj.v;

    obj.h /= 360;

    return obj;
  }

  toGrayscale(gray: number, alpha: number): any {
    return {
      a: alpha / 100,
      w: gray / 100
    };
  }

}