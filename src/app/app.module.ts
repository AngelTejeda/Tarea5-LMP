import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ResultsComponent } from './components/results/results.component';
import { HistorialComponent } from './components/historial/historial.component';

import { CookiesService } from './services/cookies.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultsComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CookiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
