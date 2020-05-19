import { Component, OnInit, ViewChild, Input, ElementRef, Inject } from '@angular/core';
import { BranchStoreService } from '../modules/Services/branchService/branch.store.service';
import { EsriService } from '../modules/Services/esri.service';
import { Branch } from '../modules/Services/branchService/branch-model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { BankOwnerComponent } from '../bank-owner/bank-owner.component';
import { FormGroup, Form } from '@angular/forms';
import { MapService } from '../modules/Services/mapService/map.service';
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {
  branches :Branch[];
  form: FormGroup;
  @ViewChild("viewDiv", { static: true }) public mapviewEl: ElementRef;
  constructor(private branchService:BranchStoreService,
     private mapService:MapService,
     private dialogRef: MatDialogRef<MapDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        console.log(data);
        console.log("CURRENT MAP FOR:"+ data.bankname);
        this.branches= data.branches;
        this.form= data.form;
        }
  ngOnInit() {
    //Create the points.
        this.mapService.initializeMapView(this.mapviewEl);
        this.mapService.addGraphicLayerFromBranch(this.branches);
        this.mapService.addClick().subscribe( (res)=> {
          this.form.controls['x'].setValue(res.x);
          this.form.controls['y'].setValue(res.y);
        }
        );

//        this.mapService.initializeMap(this.branches,this.mapviewEl,true,this.xref,this.yref);
  }

}
