import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {InputFileDirective} from './input-file.directive';
import {AppComponent} from './app.component';
import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';
import {AppStore} from './app.store';
import {ParserProvider} from './parser-provider.service';
import {StyleParser} from './style-parser.service';
import {PaletteComponent} from './palette.component';
import {ColorService} from './color.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    InputFileDirective,
    AppComponent,
    PaletteComponent
  ],
  providers: [
    AppActions,
    AppDispatcher,
    AppStore,
    ColorService,
    ParserProvider,
    StyleParser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
