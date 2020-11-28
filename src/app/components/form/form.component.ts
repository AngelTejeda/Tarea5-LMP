import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookiesService } from '../../services/cookies.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ CookiesService ]
})
export class FormComponent implements OnInit {

  @Output() readyEvent = new EventEmitter<void>();  //Evento que se emite cuando se realiza una búsqueda.

  constructor(private cookies : CookiesService) {}

  countryCode: string;  //Código del país seleccionado.
  state: string;        //Nombre del estado seleccionado.

  selectorStates: string[];   //Lista de estados que se muestra en el select.
  mexicoStates: string[];     //Lista de estados de México.
  usaStates: string[];        //Lista de estados de Estados Unidos.

  showStates: boolean;     //Variable para mostrar los estados una vez se selecciona el país.
  formDisabled : boolean;  //Variable para habilitar o deshabilitar el form.
  
  alertError: boolean;     //Variable para indicar si se debe mostrar un error en pantalla.
  errorMessage : string;   //Mensaje que se muestra si ocurre un error.

  ngOnInit() : void {
    this.selectorStates = [];

    this.mexicoStates = [
      "Aguascalientes",
      "Baja California",
      "Baja California Sur",
      "Campeche",
      "Chiapas",
      "Chihuahua",
      "Ciudad de México",
      "Coahuila de Zaragoza",
      "Colima",
      "Durango",
      "Guanajuato",
      "Guerrero",
      "Hidalgo",
      "Jalisco",
      "México",
      "Michoacán de Ocampo",
      "Morelos",
      "Nayarit",
      "Nuevo León",
      "Oaxaca",
      "Puebla",
      "Querétaro",
      "Quintana Roo",
      "San Luis Potosí",
      "Sinaloa",
      "Sonora",
      "Tabasco",
      "Tamaulipas",
      "Tlaxcala",
      "Veracruz",
      "Yucatán",
      "Zacatecas"

    ];

    this.usaStates = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississipi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New York",
      "North Carolina",
      "North Dakota",
      "Nuevo México",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ];

    this.alertError = false;
    this.formDisabled = false;
  }

  updateStates() : void {
    //Actualiza los estados que se muestran en el selector.
    //Se manda llamar desde el componente form cuando se selecciona un país.
    this.state = undefined;

    if (this.countryCode == "mx")
      this.selectorStates = this.mexicoStates;
    else
      this.selectorStates = this.usaStates

    this.showStates = true;
  }

  changeState() : void {
    //En caso de que haya un mensaje de error en pantalla, lo oculta cuando se selecciona un estado.
    //Se manda llamar desde el componente form cuando se selecciona un estado.
    this.alertError = false;
  }

  send() : void {
    //Actualiza las cookies de la búsqueda actual y realiza una llamada a la API.
    //Se manda llamar desde el componente form cuando se presiona el botón Enviar.
    if (this.state == undefined) {
      this.alertError = true;
      this.errorMessage = "No se ha seleccionado un estado.";
    }
    else {
      this.formDisabled = true;

      //Cookies de la búsqueda actual
      if (this.countryCode == "mx")
        this.cookies.setCookie("countryName", "México", 1);
      else
        this.cookies.setCookie("countryName", "Estados Unidos", 1);
      
      this.cookies.setCookie("countryCode", this.countryCode, 1);
      this.cookies.setCookie("state", this.state, 1);

      //Llamada API
      this.apiCall(this.countryCode, this.state);
    }
  }

  async apiCall(countryCode: string, state: string) {
    //Realiza una petición a la API con el país y el estado seleccionado.
    //Guarda el resutlado de la petición en cookies y emite un evento readyEvent que atrapa el componente app y le indica
    //que debe mostrar los resultados de la búsqueda.
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${state},${countryCode}&appid=c9f3f0ec30af23465397f60c7ad5fc2b&lang=es&units=metric`)
      .then(response => response.json())
      .then(data => {
        this.cookies.setCookie("lat", data.coord.lat, 1);
        this.cookies.setCookie("lon", data.coord.lon, 1);
        this.cookies.setCookie("temp", data.main.temp, 1);
        this.cookies.setCookie("maxTemp", data.main.temp_max, 1);
        this.cookies.setCookie("minTemp", data.main.temp_min, 1);

        this.readyEvent.emit();
      })
      .catch(() => {
        this.errorMessage = "Ha ocurrido un error.";
        this.alertError = true;
        this.formDisabled = false;
      });
  }
}
