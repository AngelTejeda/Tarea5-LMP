import { NgIf } from '@angular/common';
import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historialVisible: boolean;
  vacio: boolean;
  historialContent: string;

  @Input() content: string = "";

  elements = []

  constructor() {
  }

  ngOnInit(): void {
    this.historialVisible = false;
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
      var d = dupla.split("-")
      this.elements.push({
        country: d[0],
        state: d[1]
      })
    })
  }
}
