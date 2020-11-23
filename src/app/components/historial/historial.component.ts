import { Component, OnInit } from '@angular/core';

export interface historialEntryInterface {
  country: string;
  state: string;
  latitud: string;
  longitud: string;
  temperatura: string;
  maxTemperatura: string;
  minTemperatura: string;
  time: string;
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historialEntries : historialEntryInterface[]; //Arreglo de consultas en el historial.
  historialVisible: boolean;                    //Variable que indica si se muestra o no el historial.
  vacio: boolean;                               //Variable que indica si el historial está vacío.

  ngOnInit() : void {
    this.historialVisible = false;
    this.vacio = true;
    this.historialEntries = [];
  }

  toggleButton() : void {
    //Cambia entre la leyenda del botón, entre "Historial" y "Cerrar Historial".
    let btnHistorial : HTMLElement = document.getElementById("btnHistorial")

    if (this.historialVisible) {
      this.historialVisible = false;
      btnHistorial.innerHTML = "Historial"
    }
    else {
      this.historialVisible = true;
      btnHistorial.innerHTML = "Cerrar Historial"
    }
  }

  addEntryToHistorial(newEntry : string) : void {
    //Agrega una búsqueda al arreglo de historiales.
    let fields : string[] = newEntry.split("/");

    this.historialEntries.unshift(<historialEntryInterface>{
      country: fields[0],
      state: fields[1],
      latitud: fields[2],
      longitud: fields[3],
      temperatura: fields[4],
      maxTemperatura: fields[5],
      minTemperatura: fields[6],
      time : fields[7]
    });

    this.vacio = false;
  }

  initializeHistorial(historial: string) : void {
    //Inicializa el historial con base en la cookie del historial.
    //Se manda a llamar desde el componente app cuando todos los componentes están cargados.
    if(historial == "") {
      this.vacio = true;
      return;
    }
    else
      this.vacio = false;

    let entries : string[] = historial.split(",");

    entries.forEach(entry => {
      this.addEntryToHistorial(entry);
    });
  }

  borrarHistorial() : void {
    //Borra la cookie de historial y el arreglo de búsquedas.
    document.cookie = "historial=;";
    this.historialEntries = [];
    this.vacio = true;
  }
}
