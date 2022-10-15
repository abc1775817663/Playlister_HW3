import { jsTPS_Transaction } from "./jsTPS";

export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, initOldSongIndex, initNewSongIndex) {
        super();
        this.store = store;
        this.oldSongIndex = initOldSongIndex;
        this.newSongIndex = initNewSongIndex;
    }

    doTransaction() {
        this.store.moveSong(this.oldSongIndex, this.newSongIndex);
    }
    
    undoTransaction() {
        this.store.moveSong(this.newSongIndex, this.oldSongIndex);
    }
}