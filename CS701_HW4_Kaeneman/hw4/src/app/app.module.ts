import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Part1Component } from './part1/part1.component';
import { Part2Component } from './part2/part2.component';
import { TokenizerPipe } from './part2/tokenizer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Part1Component,
    Part2Component,
    TokenizerPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
