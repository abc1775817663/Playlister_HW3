import { jsTPS_Transaction } from "./jsTPS";

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, title, artist, youTubeId) {
        super();
        this.store = store;
        this.title = title;
        this.artist = artist;
        this.youTubeId = youTubeId;

        this.prevTitle = null;
        this.prevArtist = null;
        this.prevYouTubeId = null;
        this.index = null;
    }

    doTransaction() {
        if (this.prevTitle == null){
            this.prevTitle = this.store.markSongForEditing.title;
            this.prevArtist = this.store.markSongForEditing.artist;
            this.prevYouTubeId = this.store.markSongForEditing.youTubeId;
            this.index = this.store.markSongForEditingIdx;
            this.store.saveEditedSong(this.title,this.artist, this.youTubeId);
            
        }
        else{
            let song = this.store.currentList.songs[this.index];
            song.title = this.title;
            song.artist = this.artist;
            song.youTubeId = this.youTubeId;
            this.store.updateCurrentList();
        }
        
    }
    
    undoTransaction() {
        let song = this.store.currentList.songs[this.index];
        song.title = this.prevTitle;
        song.artist = this.prevArtist;
        song.youTubeId = this.prevYouTubeId;
        this.store.updateCurrentList();
    }
}