import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './components/results/results.component';
import {FormComponent} from './components/form/form.component'
import {HistorialComponent} from './components/historial/historial.component'
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tarea5';
  content: string;
  state: string;

  @ViewChild(ResultsComponent) results : ResultsComponent;
  @ViewChild(FormComponent) form : FormComponent;
  @ViewChild(HistorialComponent) hcomponent : HistorialComponent;

  resultsStateValue: boolean;

  ngOnInit():void {
    this.resultsStateValue = true;
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
      if(historial == ""){
        historial = newEntry;
      }else{
        historial = historial + "," + newEntry;
      }
      this.form.setCookie("historial", historial, 1);
    }
    this.update(historial)
  }

  update(historial: string){
    this.content = historial
    this.hcomponent.historialContent = historial;
    this.hcomponent.update()
  }

}