import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() {
    // Load the Map and MapView modules
    require(["esri/Map", "esri/views/MapView"], function(Map, MapView) {
      // Create a Map instance
      var myMap = new Map({
        basemap: 'streets'
      });
      // Create a MapView instance (for 2D viewing) and reference the map instance
      var view = new MapView({
        container: "viewDiv",
        map: myMap
      });
    });


  }

  ngOnInit(): void {
  }

}
