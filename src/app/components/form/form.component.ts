import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Models } from '../../Models/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output() readyEvent = new EventEmitter<void>();
  @Output() resultsState = new EventEmitter<boolean>();

  constructor() { }

  countryCode: string;
  state: string;
  selectorStates: string[];
  mexicoStates: string[];
  usaStates: string[];
  dataResponse: any;

  aparecer: boolean;
  alertchange: boolean;
  alertError: boolean;
  mensaje: string = "Mandando informacion";

  countryDisabled: boolean;
  stateDisabled: boolean;
  buttonDisabled: boolean;

  results: boolean;

  ngOnInit() {
    this.selectorStates = [];

    this.mexicoStates = [
      "Nuevo León",
      "Ciudad de México",
      "Morelos"
    ];

    this.usaStates = [
      "Washington",
      "Los Ángeles"
    ];

    this.aparecer = false;
    this.alertchange = false;
    this.alertError = false;
    this.results = false;

    this.countryDisabled = false;
    this.stateDisabled = false;
    this.buttonDisabled = false;
  }

  updateStates() {
    this.state = undefined;
    if (this.countryCode == "mx") {
      this.selectorStates = this.mexicoStates;
    }
    else {
      this.selectorStates = this.usaStates
    }
    this.aparecer = true;
    this.alertchange = true;
  }

  changeState() {
    this.alertchange = true;
    if(this.alertError){
      this.alertError = false;
    }
  }

  send() {
    /*
    this.countryDisabled = true;
    this.stateDisabled = true;
    this.buttonDisabled = true;
    */
    if (this.state == undefined) {
      this.alertError = true;
    } else {
      this.alertchange = false;
      if (this.countryCode == "mx")
        this.setCookie("countryName", "México", 1);
      else
        this.setCookie("countryName", "Estados Unidos", 1);
      this.setCookie("countryCode", this.countryCode, 1);
      this.setCookie("state", this.state, 1);

      this.apiCall(this.countryCode, this.state);
    }
    this.resultsState.emit(this.results);
  }

  async apiCall(countryCode: string, state: string) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${state},${countryCode}&appid=c9f3f0ec30af23465397f60c7ad5fc2b&lang=es&units=metric`)
      .then(data => data.json())
      .then(data => {
        this.setCookie("lat", data.coord.lat, 1);
        this.setCookie("lon", data.coord.lon, 1);
        this.setCookie("temp", data.main.temp, 1);
        this.setCookie("maxTemp", data.main.temp_max, 1);
        this.setCookie("minTemp", data.main.temp_min, 1);
        this.readyEvent.emit();
      });
      this.results = true;
  }

  setCookie(cookieName: string, cookieValue: string, daysToExpire: number): void {
    let date: Date = new Date();
    let expires: string = "expires=";

    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    expires += date.toISOString();

    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
}
