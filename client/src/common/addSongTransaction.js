import { jsTPS_Transaction } from "./jsTPS";

export default class AddSong_Transaction extends jsTPS_Transaction {
    
    constructor(store) {
        super();
        this.store = store;
        this.index = null;
    }

    doTransaction() {
        if (this.index == null){
            this.index = this.store.currentList.songs.length;
        }
        this.store.addNewSong();
    }
    
    undoTransaction() {
        this.store.removeSongBySpecifiedIndex(this.index);
    }
}