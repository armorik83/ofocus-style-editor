import {Component} from '@angular/core';

@Component({
  selector: 'se-app',
  template: `
    <h1>Import ofocus-style</h1>
    <input
      type="file"
      (result)="onResultInputFile($event)"
    >
    <button
      (click)="onClickImport()"
      [attr.disabled]="disableImport ? true : null"
    >
      Import
    </button>
  `
})
export class AppComponent {

  onResultInputFile(result: string | null): void {
    console.log(result);
  }

  onClickImport(): void {
    console.log(`onClickImport`);
  }

}
