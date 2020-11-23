import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Output() closeResultsEvent = new EventEmitter<boolean>();
  @Output() initializeHistorial = new EventEmitter<string>();

  constructor() {
    this.showCard =  false;
  }

  showCard: boolean;

  //Resultados de la Búsqueda
  countryName : string; //Nombre del país
  state : string;       //Nombre del estado
  lat : string;         //Latitud
  lon : string;         //Longitud
  temp : string;        //Temperatura Actual
  maxTemp : string;     //Temperatura Máxima
  minTemp : string;     //Temperatura Mínima

  ngOnInit() : void {
    //Al iniciar el componente se toma el historial de las cookies para actualizaro.
    this.initializeHistorial.emit(this.getCookie("historial"));
  }

  displayValues() : void {
    //Toma los valores de los resultados de la búsqueda actual desde las cookies y los guarda para mostrarlos en el componente.
    //Se manda llamar desde el componente app cuando captura un evento readyEvent lanzado por el componente form.
    this.showCard = true;

    //Resultados de la búsqueda.
    this.countryName = this.getCookie("countryName");
    this.state = this.getCookie("state");
    this.lat = this.getCookie("lat");
    this.lon = this.getCookie("lon");
    this.temp = this.getCookie("temp");
    this.maxTemp = this.getCookie("maxTemp");
    this.minTemp = this.getCookie("minTemp");
  }

  getCookie(cookieName : string) : string {
    //Regresa el valor de la cookie indicada.
    let allCookies : string[] = decodeURIComponent(document.cookie).split(";");

    for(let cookie of allCookies) {
      let temp : string[] = cookie.split("=");
      
      if(temp[0].charAt(0) == ' ')
        temp[0] = temp[0].substr(1);

      if(temp[0] == cookieName) {
        return temp[1];
      }
    }

    return "";
  }

  close() : void {
    //Oculta el componente.
    this.showCard = false;
    this.closeResultsEvent.emit();
  }

}
