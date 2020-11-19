import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor() { }

  countryName : string;
  state : string;
  lat : string;
  lon : string;
  temp : string;
  maxTemp : string;
  minTemp : string;

  ngOnInit() : void {
    
  }

  displayValues() : void {
    this.countryName = this.getCookie("countryName");
    this.state = this.getCookie("state");
    this.lat = this.getCookie("lat");
    this.lon = this.getCookie("lon");
    this.temp = this.getCookie("temp");
    this.maxTemp = this.getCookie("maxTemp");
    this.minTemp = this.getCookie("minTemp");
  }

  getCookie(cookieName : string) : string {
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
}
