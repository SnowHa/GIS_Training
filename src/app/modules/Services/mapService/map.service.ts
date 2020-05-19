import { Injectable, ElementRef } from '@angular/core';
import Map from 'esri/Map';
import Graphic from 'esri/Graphic';
import MapView from 'esri/views/MapView';
import { Branch } from '../branchService/branch-model';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { Point, SpatialReference } from 'esri/geometry';
import { SimpleMarkerSymbol, SimpleLineSymbol } from 'esri/symbols';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import LayerView from 'esri/views/layers/LayerView';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Map;
  mapView: MapView;
  selectedPoint: BehaviorSubject<Point>;
  constructor() {
    this.map = new Map({
      basemap: 'gray'    
    });
  }
  convertToGraphics(branches: Branch[]): Graphic[] {
    let allbanks = new Array<string>();
    var graphics = [];

    branches.forEach(b => {
      if (!allbanks.includes(b.bank)) {
        allbanks.push(b.bank);
      }
    });
    let id = 0;
    allbanks.forEach(bankName => {
      let currColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      branches.filter(x => x.bank == bankName).forEach((singleB) => {
        graphics.push(new Graphic({
          attributes:{
            ObjectId: ++id,
            name: singleB.name,
            balance: singleB.balance,
            bank: singleB.bank
          },
          geometry: new Point({
            x: singleB.x,
            y: singleB.y,
            spatialReference: new SpatialReference({wkid:102100}) 
          }),
          symbol: new SimpleMarkerSymbol({ // autocasts as new SimpleMarkerSymbol()
          color: currColor,
          size: 12,
          outline: { // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: "darkblue"
          }})
        }));
      });
    });
    return graphics;
  }
  addClick() {
    this.selectedPoint = new BehaviorSubject<Point>(new Point());
    this.mapView.on("click", (evt) => {
      console.log("X: " + evt.mapPoint.x.toString() + ", Y: " + evt.mapPoint.y.toString());
      var oldGraphic = this.mapView.graphics.getItemAt(0);
      var simM = new SimpleMarkerSymbol({
        color: 'blue',
        size: 12,
        outline: {
          width: 0.5,
          color: 'darkblue'
        }
      });
      console.log(evt.mapPoint.spatialReference);
      var graphic = new Graphic({
        geometry: evt.mapPoint,
        symbol: simM
      });
      this.mapView.graphics.remove(oldGraphic);
      this.mapView.graphics.add(graphic as Graphic);
      this.selectedPoint.next(evt.mapPoint);
    });
    return this.selectedPoint;
  }
  addGraphicLayerFromBranch(branches: Branch[]) {
    let graphicArr= this.convertToGraphics(branches);
    console.log(graphicArr);
    let graphicsLayer = new GraphicsLayer({
      graphics: graphicArr
    });
    this.map.layers.add(graphicsLayer);
    //this.mapView.layerViews.add(new LayerView())
  }
  initializeMapView(mapContainer: ElementRef) {
    try {
      // Create a MapView instance (for 2D viewing) and reference the map instance
      //when the map is clicked create a buffer around the click point of the specified distance.
      let viewProperties = {
        map: this.map,
        center: [35, 32],
        zoom: 10,
        //spatialReference: new SpatialReference({wkid:4326}),
        container: mapContainer.nativeElement,
        popup: {
          dockEnabled: true,
          dockOptions: {
            position: "top-right",
            breakpoint: false
          }
        }
      };
      this.mapView = new MapView(viewProperties);
    } catch (error) {
      console.log("Esri: ", error);
    }
  }
}
/*initializeMap(branches : Branch[], mapContainer: ElementRef, find:boolean,
    xref: ElementRef=null, yref: ElementRef=null) {
    try {
      // Configure the Map
      let allbanks=new Array<string>();

      branches.forEach(b => {
        if(!allbanks.includes(b.bank))
        {
          allbanks.push(b.bank);
        }
      });
      let id=0;
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
               var graphics = branches.filter(x=> x.bank==bankName).map((singleB)=> {
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
                      spatialReference: {wkid: 4326},
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
      //return this.view;
    } catch (error) {
      console.log("Esri: ", error);
    }
    } */