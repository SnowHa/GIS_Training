import { Injectable } from '@angular/core';
import { Store } from 'src/app/modules/Store/store';

export class UiState {
    editMode: boolean;
    

}

const INITIAL_UI_STATE: UiState = {
    editMode: false

};


@Injectable()
export class UiStoreService extends Store<UiState> {
    constructor() {
        super('UI',INITIAL_UI_STATE)
    }


    setEditMode() {
        this.updateState('[UI]', {editMode: true});
    }
}