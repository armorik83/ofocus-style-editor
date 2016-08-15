import {Component, Input} from '@angular/core';

import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';
import {ColorService} from './color.service';

type PaletteType = 'abgr' | 'abhs' | 'aw' | 'nested' | '';

@Component({
  selector: 'se-palette',
  template: `
    <div *ngIf="type !== 'nested' && type !== 'aw'">
      <p>{{key}}</p>
      <div>
        <input type="color" [(ngModel)]="colorModel" (change)="onColorChange()">
        <input type="range" [(ngModel)]="alphaModel" (change)="onColorChange()" min="0" max="100">
        {{colorModel}}&nbsp;{{alphaModel}}
      </div>
    </div>

    <div *ngIf="type == 'aw'">
      <p>{{key}}</p>
      <div>
        <input type="range" [(ngModel)]="grayscaleModel" (change)="onColorChange()" min="0" max="100">
        <input type="range" [(ngModel)]="alphaModel"     (change)="onColorChange()" min="0" max="100">
        {{grayScaleModel}}&nbsp;{{alphaModel}}
      </div>
    </div>

    <div *ngIf="type === 'nested'">
      <h3>{{key}}</h3>
      <se-palette
        *ngFor="let _key of keys"
        [key]   ="_key"
        [parent]="parent.concat(key)"
        [value] ="value[_key]"
      ></se-palette>
    </div>
  `
})
export class PaletteComponent {

  @Input() key: string;
  @Input() value: any;
  @Input() parent: string[];

  private type: PaletteType;
  private rgb: string;
  private colorModel: string;
  private grayscaleModel: number;
  private alphaModel: number;
  private keys: string[] = [];

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher,
              private colorService: ColorService) {
    //
  }

  ngOnInit(): void {
    this.type = this.getType(this.value);
    if (this.type === 'nested') {
      this.keys = Object.keys(this.value);
      return;
    }

    this.alphaModel = this.value.a * 100;

    if (this.type === 'aw') {
      this.grayscaleModel = this.value.w;
      return;
    }
    this.colorModel = this.getRgb(this.value, this.type);
  }

  onColorChange(): void {
    const colorObj = (() => {
      if (this.type === 'abgr') {
        return this.colorService.toRgba(this.colorModel, this.alphaModel);
      }
      if (this.type === 'abhs') {
        return this.colorService.toHsba(this.colorModel, this.alphaModel);
      }
      if (this.type === 'aw') {
        return this.colorService.toGrayscale(this.grayscaleModel, this.alphaModel);
      }
      return {};
    })();

    this.dispatcher.emit(this.actions.updateStyle(this.parent.concat(this.key), colorObj));
  }

  private getType(value: any): PaletteType {
    if (typeof value !== 'object') {
      return '';
    }

    const type = Object.keys(value).sort().join('');
    if (type !== 'abgr'
      && type !== 'abhs'
      && type !== 'aw'
    ) {
      console.log(type);
      return 'nested';
    }
    return type as PaletteType;
  }

  private getRgb(value: any, type: PaletteType): string {
    if (type === 'abgr') {
      return this.colorService.fromRgba(value);
    }
    if (type === 'abhs') {
      return this.colorService.fromHsba(value);
    }
    throw new Error('Unknown type given.');
  }

}
