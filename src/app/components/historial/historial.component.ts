import { NgIf } from '@angular/common';
import { Component, OnInit, Input} from '@angular/core';

export interface searchResultsInterface {
  country: string;
  state: string;
  latitud: string;
  longitud: string;
  temperatura: string;
  maxTemperatura: string;
  minTemperatura: string;
  time: Date;
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  @Input() content: string = "";

  historialVisible: boolean;
  vacio: boolean;
  historialContent: string;

  elements : searchResultsInterface[];

  constructor() {
  }

  ngOnInit(): void {
    this.historialVisible = false;
    this.elements = [];
  }

  show() {
    var btnHistorial = document.getElementById("btnHistorial")
    if (this.historialVisible) {
      this.historialVisible = false;
      btnHistorial.innerHTML = "Historial"
    }
    else {
      this.historialVisible = true;
      btnHistorial.innerHTML = "Cerrar Historial"
    }
    this.historialContent = this.content
    this.update()
    if(this.elements[0].country==""){
      this.vacio=true;
    }else{
      this.vacio=false;
    }
  }

  update() {
    this.elements = []
    var duplas = this.historialContent.split(",");
    duplas.forEach(dupla => {
      var d = dupla.split("/")
      this.elements.push(<searchResultsInterface>{
        country: d[0],
        state: d[1],
        latitud: d[2],
        longitud: d[3],
        temperatura: d[4],
        maxTemperatura: d[5],
        minTemperatura: d[6]
      })
    })
  }

  initializeHistorial() : void {
    this.elements = []
    var duplas = this.historialContent.split(",");

    duplas.forEach(dupla => {
      var d = dupla.split("/")
      this.elements.push(<searchResultsInterface>{
        country: d[0],
        state: d[1],
        latitud: d[2],
        longitud: d[3],
        temperatura: d[4],
        maxTemperatura: d[5],
        minTemperatura: d[6]
      });
    });
  }  
}
