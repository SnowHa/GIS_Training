import {Injectable, ElementRef} from '@angular/core';
import esriConfig from 'esri/config';
import { Branch } from './branchService/branch-model';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class EsriService {
  constructor() {
    const DEFAULT_WORKER_URL = "https://js.arcgis.com/4.15/";
    (esriConfig.workers as any).loaderUrl= `${DEFAULT_WORKER_URL}dojo/dojo-lite.js`;
    esriConfig.workers.loaderConfig = {
      baseUrl: `${DEFAULT_WORKER_URL}`,
      packages: [
        {name: "esri", location: DEFAULT_WORKER_URL+"esri"},
        {name: "dojo", location: DEFAULT_WORKER_URL+"dojo"},
        {name: "dojox", location: DEFAULT_WORKER_URL+"dojox"},
        {name: "dijit", location: DEFAULT_WORKER_URL+"dijit"},
        {name: "dstore", location: DEFAULT_WORKER_URL+"dstore"},
        {name: "moment", location: DEFAULT_WORKER_URL+"moment"},
        {name: "@dojo", location: DEFAULT_WORKER_URL+"@dojo"},
        {name: "cldrjs", location: DEFAULT_WORKER_URL+"cldrjs", main: "dist/cldr"},
        {name: "globalize", location: DEFAULT_WORKER_URL+"globalize", main: "dist/globalize"},
        {name: "maquette", location: DEFAULT_WORKER_URL+"maquette", main: "dist/maquette.umd"},
        {name: "maquette-css-transitions", location: DEFAULT_WORKER_URL+"maquette-css-transitions", main: "dist/maquette-css-transitions.umd"},
        {name: "maquette-jsx", location: DEFAULT_WORKER_URL+"maquette-jsx", main: "dist/maquette-jsx.umd"},
        {name: "tslib", location: DEFAULT_WORKER_URL+"tslib", main: "tslib"},
      ]
    } as any;
  }
   async initializeMap(branches : Branch[], mapContainer: ElementRef, find:boolean,
    xref: ElementRef=null, yref: ElementRef=null) {
    try {
      // Configure the Map
      var allbanks=new Array<string>();
      
      branches.forEach(b => {
        if(!allbanks.includes(b.bank))
        {
          allbanks.push(b.bank);
        }
      });
      var id=0;
      require(["esri/Map",
              "esri/graphic",
               "esri/views/MapView",
               "esri/layers/FeatureLayer"],
        function(Map,Graphic,MapView,FeatureLayer) {
            var map = new Map({
              basemap: 'gray'
            });
            // Create a MapView instance (for 2D viewing) and reference the map instance
            //when the map is clicked create a buffer around the click point of the specified distance.
            
            var viewProperties = {
              map: map,
              center: [ 35, 32 ],
              zoom: 10 ,
              container: mapContainer.nativeElement,
                popup: {
                  dockEnabled: true,
                  dockOptions: {
                    position: "top-right",
                    breakpoint: false
                  }
                }
            };
            var f_fields= [
              {
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
              },
              {
                name: "name",
                alias: "name",
                type: "string"
              },
              {
                name: "bank",
                alias: "bank",
                type: "string"
              },
              {
                name: "balance",
                alias: "balance",
                type: "double"
              }
            ];

            allbanks.forEach(bankName => {
               var currColor= '#'+Math.floor(Math.random()*16777215).toString(16);
               var branchesRenderer= {
                  type: "simple",                    // autocasts as new SimpleRenderer()
                    symbol: {                          // autocasts as new SimpleMarkerSymbol()
                      type: "simple-marker",
                      size: 12,
                      color: currColor,
                      outline: {                       // autocasts as new SimpleLineSymbol()
                        color:  "#102A44",
                        width: 2
                      }
                }
                };
               var graphics = branches.filter(x=> x.bank==bankName).map(function (singleB) {
                  return new Graphic({
                    attributes: {
                      ObjectId: ++id,
                      name: singleB.name,
                      balance: singleB.balance,
                      bank: singleB.bank
                    },
                    geometry: {
                      x: singleB.x,
                      y: singleB.y,
                      spatialReference: {wkid: 102100},
                      type: "point"
                    }
                  });
                });
              var featureLayer = new FeatureLayer({
                source: graphics,
                renderer: branchesRenderer,
                objectIdField: "ObjectID", // This must be defined when creating a layer from `Graphic` objects
                fields: f_fields,
                spatialReference: {
                  wkid: 4326
                },
                outFields: ["*"],
                popupTemplate:   
                {   
                  title: "Selected Branch",
                  content: [{
                    type: "fields",
                    fieldInfos: [
                      {
                        fieldName: "name",
                        label: "Branch Name",
                        visible: true
                      },
                      {
                        fieldName: "bank",
                        label: "Bank Name",
                        visible: true
                      },
                      {
                        fieldName: "balance",
                        label: "Branch Balance",
                        visible: true
                      }
                    ]
                  }] 
              },
                geometryType: "point"
              });    
              map.layers.add(featureLayer);
            });
            var view = new MapView(viewProperties);
            view.on("click", function(evt){
              console.log("X: " + evt.mapPoint.x.toString() + ", Y: " + evt.mapPoint.y.toString());
              if(find)
                    {
                      var graphic = new Graphic({
                      geometry: evt.mapPoint,
                      symbol: {
                        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                        color: "blue",
                        size: 12,
                        outline: { // autocasts as new SimpleLineSymbol()
                          width: 0.5,
                          color: "darkblue"
                        }
                      }
                    });
                    var oldGraphic=view.graphics.items[0];
                    view.graphics.remove(oldGraphic);
                    xref.nativeElement.value=evt.mapPoint.x;
                    yref.nativeElement.value=evt.mapPoint.y;
                    view.graphics.add(graphic as Graphic);
                  }
            });
        });
      //return this.view;
    } catch (error) {
      console.log("Esri: ", error);
    }
  }
}
