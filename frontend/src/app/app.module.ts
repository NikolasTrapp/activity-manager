import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule } from '@angular/forms'
import {ListboxModule} from 'primeng/listbox';
import {ToolbarModule} from 'primeng/toolbar';
import {MessagesModule} from 'primeng/messages';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    ListboxModule,
    ToolbarModule,
    MessagesModule,
    DropdownModule,
    TableModule,
    AccordionModule
    // MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
