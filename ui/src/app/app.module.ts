import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';
import { ManyeditComponent } from './manyedit/manyedit.component';
import { EditorService } from './editor.service';

@NgModule({
  declarations: [
    AppComponent,
    ManyeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ EditorService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
