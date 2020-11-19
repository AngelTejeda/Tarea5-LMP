import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './components/results/results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tarea5';

  @ViewChild(ResultsComponent) results : ResultsComponent;

  country : string;
  state : string;

  ngOnInit() {
    
  }

  showResults($event) {
    this.results.displayValues();
  }
}