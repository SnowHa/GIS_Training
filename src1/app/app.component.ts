import { Component } from '@angular/core';
import Map from 'esri/Map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ron';
  v= new Map();
}
