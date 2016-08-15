import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {InputFileDirective} from './input-file.directive';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    InputFileDirective,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
