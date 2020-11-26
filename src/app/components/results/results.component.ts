import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [CookiesService]
})
export class ResultsComponent implements OnInit {

  @Output() closeResultsEvent = new EventEmitter<boolean>();

  constructor(private cookies : CookiesService) {}
  
  //Resultados de la Búsqueda
  countryName : string; //Nombre del país
  state : string;       //Nombre del estado
  lat : string;         //Latitud
  lon : string;         //Longitud
  temp : string;        //Temperatura Actual
  maxTemp : string;     //Temperatura Máxima
  minTemp : string;     //Temperatura Mínima
  
  showCard: boolean;

  ngOnInit() : void {
    this.showCard = false;
  }

  displayValues() : void {
    //Toma los valores de los resultados de la búsqueda actual desde las cookies y los guarda para mostrarlos en el componente.
    //Se manda llamar desde el componente app cuando captura un evento readyEvent lanzado por el componente form.
    this.showCard = true;

    //Resultados de la búsqueda.
    this.countryName = this.cookies.getCookie("countryName");
    this.state = this.cookies.getCookie("state");
    this.lat = this.cookies.getCookie("lat");
    this.lon = this.cookies.getCookie("lon");
    this.temp = this.cookies.getCookie("temp");
    this.maxTemp = this.cookies.getCookie("maxTemp");
    this.minTemp = this.cookies.getCookie("minTemp");
  }

  close() : void {
    //Oculta el componente.
    this.showCard = false;
    this.closeResultsEvent.emit();
  }

}
