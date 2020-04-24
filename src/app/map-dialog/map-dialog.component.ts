import { Component, OnInit, ViewChild, Input, ElementRef, Inject } from '@angular/core';
import { BranchStoreService } from '../modules/Services/branchService/branch.store.service';
import { EsriService } from '../modules/Services/esri.service';
import { Branch } from '../modules/Services/branchService/branch-model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { BankOwnerComponent } from '../bank-owner/bank-owner.component';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {
  branches :Branch[];
  xref: ElementRef;
  yref: ElementRef;
 
  @ViewChild("viewDiv", { static: true }) public mapviewEl: ElementRef;
  constructor(private branchService:BranchStoreService,
     private mapService:EsriService,
     private dialogRef: MatDialogRef<MapDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        console.log(data);
        console.log("CURRENT MAP FOR:"+ data.bankname);
        this.branches= data.branches;
        this.xref=data.xref;
        this.yref=data.yref;
        }
  ngOnInit() {
    //Create the points.

        this.mapService.initializeMap(this.branches,this.mapviewEl,true,this.xref,this.yref);
  }

}
