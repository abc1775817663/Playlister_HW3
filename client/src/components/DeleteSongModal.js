import { useContext, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'


function DeleteSongModal(){
    let hideDeleteSongModalCallback = (event) => {
        store.hideDeleteSongModal();
    }
    let deleteSongCallback = (event) => {
        
        store.removeSongByIndex();

    }
    

    const {store} = useContext(GlobalStoreContext);
    return (
        <div 
            class={"modal" + (store.markSongForDeletionIdx != null ? " is-visible" : "")}
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-delete-song-root'>
                    <div class="modal-north">
                        Remove Song?
                    </div>
                    <div class="modal-center">
                        <div class="modal-center-content">
                            Are you sure you wish to permanently remove <b>{store.markSongForDeletionIdx != null? store.currentList.songs[store.markSongForDeletionIdx].title: ""}</b> from the playlist?
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            class="modal-button" 
                            onClick={deleteSongCallback}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            class="modal-button" 
                            onClick={hideDeleteSongModalCallback}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
    
}

export default DeleteSongModal;