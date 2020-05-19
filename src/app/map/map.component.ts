import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { EsriService } from '../modules/Services/esri.service';
import { Branch } from '../modules/Services/branchService/branch-model';
import { BranchService } from '../modules/Services/branchService/branch.service';
import { MapService } from '../modules/Services/mapService/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  @ViewChild("viewDiv", { static: true }) public mapviewEl: ElementRef;
  constructor(private branchService:BranchService, private mapService: MapService) {
  }
//  "https://js.arcgis.com/4.5/js/esri/themes/light/main.css"
  ngOnInit() {
    //IDEA= have it do loaded= false on ngdes.
    this.branchService.getAll().then(res1=>{
      if(res1!=null)
      { 
          
        this.mapService.addGraphicLayerFromBranch(res1 as Array<Branch>);
        this.mapService.initializeMapView(this.mapviewEl);
          //this.mapService.addClick();
            //        this.mapService.initializeMap(res1 as Array<Branch>,this.mapviewEl,false);
        // this.cd.detectChanges();
      }
    });
  }
}
