import {Directive, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: 'input[type=file]'
})
export class InputFileDirective {

  @Output() result: EventEmitter<string | null> = new EventEmitter<string | null>();

  @HostListener('change', ['$event'])
  onChange(ev: Event): void {
    const files = (<HTMLInputElement>ev.target).files;
    if (!files) {
      return;
    }

    const file = files[0];
    if (!file) {
      this.result.emit(null);
      return;
    }

    const fileReader  = new FileReader();
    fileReader.onload = (fileEvent: ProgressEvent) => {
      const result: string = (<any>fileEvent.target).result;
      this.result.emit(result);
    };

    fileReader.readAsText(file);
  }

}
