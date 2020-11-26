import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  setCookie(cookieName: string, cookieValue: string, daysToExpire: number) : void {
    //Agrega una cookie con el nombre y el valor especificado.
    let date: Date = new Date();
    let expires: string = "expires=";

    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    expires += date.toISOString();

    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
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
}
