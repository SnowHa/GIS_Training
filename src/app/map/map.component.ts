import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { EsriService } from '../modules/Services/esri.service';
import { Branch } from '../modules/Services/branchService/branch-model';
import { BranchStoreService } from '../modules/Services/branchService/branch.store.service';
import { single } from 'rxjs/operators';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  @ViewChild("viewDiv", { static: true }) public mapviewEl: ElementRef;
  constructor(private branchService:BranchStoreService, private mapService:EsriService) {
  }
//  "https://js.arcgis.com/4.5/js/esri/themes/light/main.css"
  ngOnInit() {
    //IDEA= have it do loaded= false on ngdes.
    this.branchService.quickAllFetch().then(res1=>{
      if(res1!=null)
      { 
        this.mapService.initializeMap(res1 as Array<Branch>,this.mapviewEl,false);
        // this.cd.detectChanges();
      }
    });
  }
}
