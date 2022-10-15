import { jsTPS_Transaction } from "./jsTPS";

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
        this.index = null;
        this.song = null;
    }

    doTransaction() {
        if (this.index == null){
            this.index = this.store.markSongForDeletionIdx;
            this.song = {...this.store.currentList.songs[this.index]};
            console.log(this.index);
            console.log(this.song);
        }
        this.store.removeSongBySpecifiedIndex(this.index);  
              
    }
    
    undoTransaction() {
        this.store.addSongByIndex(this.index, this.song);
    }
}