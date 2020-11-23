import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './components/results/results.component';
import { FormComponent } from './components/form/form.component'
import { HistorialComponent } from './components/historial/historial.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tarea5';

  @ViewChild(ResultsComponent) resultsComponent : ResultsComponent;
  @ViewChild(FormComponent) formComponent : FormComponent;
  @ViewChild(HistorialComponent) historialComponent : HistorialComponent;

  ngAfterViewInit() : void {
    this.historialComponent.initializeHistorial(this.resultsComponent.getCookie("historial"));
  }

  showResults() : void {
    //Muestra los resultados de la búsqueda en el componente results y agrega la búsqueda al historial.
    this.resultsComponent.displayValues();
    this.addToHistory();
  }

  closeResults() : void {
    //Habilita el formulario del componente form.
    this.formComponent.formDisabled = false;
  }

  addToHistory() : void {
    //Agrega la búsqueda actual al historial.
    let historial : string = this.resultsComponent.getCookie("historial");
    let newEntry : string = 
      this.resultsComponent.getCookie("countryName") + "/" +
      this.resultsComponent.getCookie("state")+ "/" +
      this.resultsComponent.getCookie("lat") + "/" +
      this.resultsComponent.getCookie("lon") + "/" +
      this.resultsComponent.getCookie("temp") + "/" +
      this.resultsComponent.getCookie("maxTemp") + "/" +
      this.resultsComponent.getCookie("minTemp") + "/" +
      new Date().toUTCString().replace(",", "");
    
    if(historial == "")
      historial = newEntry;
    else
      historial += "," + newEntry;
    
    this.formComponent.setCookie("historial", historial, 1);

    this.historialComponent.addEntryToHistorial(newEntry);
  }
}