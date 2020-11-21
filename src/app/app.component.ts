import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './components/results/results.component';
import {FormComponent} from './components/form/form.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tarea5';

  @ViewChild(ResultsComponent) results : ResultsComponent;
  @ViewChild(FormComponent) form : FormComponent;

  resultsStateValue: boolean;

  ngOnInit() {
    this.resultsStateValue = false;
  }

  showResults($event) {
    this.results.displayValues();

    this.addToHistory();
  }

  showResultsSection(rsValue: boolean){
    this.resultsStateValue = rsValue;
  }

  close(rsClose: boolean){
    this.resultsStateValue = rsClose;
    this.form.countryDisabled = false;
    this.form.stateDisabled = false;
    this.form.buttonDisabled = false;
  }

  addToHistory() {
    let historial : string = this.results.getCookie("historial");
    let newEntry : string = this.results.getCookie("countryName") + "-" + this.results.getCookie("state"); 

    if( historial.indexOf(newEntry) == -1) {
      historial = historial + "," + newEntry;
      this.form.setCookie("historial", historial, 1);
    }
  }

}