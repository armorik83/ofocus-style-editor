import {Component, Input} from '@angular/core';

import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';

type PaletteType = 'abgr' | 'abhs' | 'aw' | 'nested' | '';

@Component({
  selector: 'se-palette',
  template: `
    <p *ngIf="type !== 'nested'">{{key}}</p>
    
    <p *ngIf="type === 'abgr'">
      abgr
    </p>
    
    <p *ngIf="type === 'abhs'">
      abhs
    </p>
    
    <p *ngIf="type === 'aw'">
      aw
    </p>
    
    <div *ngIf="type === 'nested'">
      <h3>{{key}}</h3>
      <se-palette
        *ngFor="let key of keys"
        [key]="key"
        [value]="value[key]"
      ></se-palette>
    </div>
  `
})
export class PaletteComponent {

  @Input() key: string;
  @Input() value: any;

  private type: PaletteType;
  private keys: string[] = [];

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {
    //
  }

  ngOnInit(): void {
    this.type = this.getType(this.value);
    if (this.type === 'nested') {
      this.keys = Object.keys(this.value);
    }
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

}
