import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '../../Store/store';
import { Branch } from './branch-model';
import { BranchService } from './branch.service';

export class BranchData {
  branches: Branch[];
  currentBank: string;
  selectedBranch: Branch;
  branchLoaded: boolean;
}

const INITIAL_BRANCH_DATA: BranchData = {
  branches: new Array<Branch>(),
  currentBank: "",
  selectedBranch: new Branch(),
  branchLoaded: false
};

@Injectable({
  providedIn: 'root'
})
export class BranchStoreService extends Store<BranchData> {
  constructor(private branchService: BranchService) {
    super("branches", INITIAL_BRANCH_DATA);
  }


  public loadBranch(resetSelected: boolean = true, name: string = "") {
    this.setState('[branches] LOADING', s => ({ ...s, branchesLoaded: false }));
    const branches = new Array<Branch>();
    if (name) {
      this.branchService.getBranchByBank(name).toPromise().then((res) => {
        if (res) {
          for (let b of JSON.parse(res)) {
            branches.push(new Branch(b));
          }
        }
        if (resetSelected)
          {this.setState('[branches] ADD SELECTED', s => ({ ...s, branches:branches ,selectedBranch: branches[0],branchLoaded: true }));}
        
        else
          {this.updateState('[branches] LOADED BY BANK', { branches: branches, branchLoaded: true });}
      }); 

    }
    else {
      this.branchService.getBranches().toPromise().then((res) => {
          for (let b of JSON.parse(res)) {
            branches.push(new Branch(b));
        }
        if (this.getSnapshot().selectedBranch) {
          this.setState('[branches] ADD SELECTED', s => ({ ...s, selectedBranch: branches[0] }));
        }
        this.updateState('[branches] LOAD', { branches: branches, branchLoaded: true });
      });
    }
  }

  getBranches(loadFirst: boolean = false): Observable<Array<Branch>> {
    if (loadFirst) {
      this.loadBranch(true);
    }
    return this.select(state => state.branches);
  }

  public getBranchByName(name: string) {
    return this.branchService.getBranchByName(name).pipe(map((res) => {
      if (res) {
        let b = JSON.parse(res);
        let branch = new Branch(b[0]);
        return branch;
      }
      else {
        return null;
      }
    }));
  }
  public addBranch(branch: Branch) {
    let newBranches = [...this.getSnapshot().branches, branch];
    this.branchService.addBranch(branch).toPromise().then(
      (res) => {
        this.setState('[branches] ADD', s => ({ ...s, branches: newBranches }))
      });
  }
  //the branch that is selected
  public updateSelected(name: string) {
    let bank = this.getSnapshot().branches.filter(function (x) {
      return x.name == name;
    })[0]
      ;
    this.setState('[branches] ADD SELECTED', s => ({ ...s, selectedBranch: bank }));
  }
  public getSelected(loadFirst: boolean = false): Observable<Branch> {
    if (loadFirst) {
      if (this.getSnapshot().branches) {
        this.loadBranch(true);
      }
      else {
        let b = this.getSnapshot().branches[0];
        this.setState('[branches] ADD SELECTED', s => ({ ...s, selectedBranch: b }));
      }
    }
    return this.select(state => state.selectedBranch);
  }

  isLoading(): Observable<boolean> {
    return this.select(state => state.branchLoaded);
  }
}
