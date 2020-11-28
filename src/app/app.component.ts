import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './components/results/results.component';
import { FormComponent } from './components/form/form.component';
import { HistorialComponent } from './components/historial/historial.component';
import { CookiesService } from './services/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ CookiesService ]
})
export class AppComponent {
  title = 'Tarea5';

  @ViewChild(ResultsComponent) resultsComponent : ResultsComponent;
  @ViewChild(FormComponent) formComponent : FormComponent;
  @ViewChild(HistorialComponent) historialComponent : HistorialComponent;
  
  constructor(private cookies : CookiesService) {}

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
    let historial : string = this.cookies.getCookie("historial");
    let newEntry : string = 
      this.cookies.getCookie("countryName") + "/" +
      this.cookies.getCookie("state")+ "/" +
      this.cookies.getCookie("lat") + "/" +
      this.cookies.getCookie("lon") + "/" +
      this.cookies.getCookie("temp") + "/" +
      this.cookies.getCookie("maxTemp") + "/" +
      this.cookies.getCookie("minTemp") + "/" +
      new Date();
    
    if(historial == "")
      historial = newEntry;
    else
      historial += "," + newEntry;
    
    this.cookies.setCookie("historial", historial, 1);

    this.historialComponent.addEntryToHistorial(newEntry);
  }
}