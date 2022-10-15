import { useContext, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal () {
    const {store} = useContext(GlobalStoreContext);
    
    let song = store.markSongForEditing;

    // console.log(song.title);

    let localSongInfo = {
        title: "",
        artist: "",
        youTubeId: ""
    };

    console.log("ENTERING THE MODAL")
    if (store.songInfoActive){
        console.log("getting song information");
        localSongInfo = {...song};
    }

    console.log(localSongInfo)


    let handleChangeTitle = (event) => {
        localSongInfo.title = event.target.value;
    }
    let handleChangeArtist = (event) => {
        localSongInfo.artist = event.target.value;
    }
    let handleChangeLink = (event) => {
        localSongInfo.youTubeId = event.target.value;
    }
    let handleCancel = (event) => {
        store.hideEditSongModal();
    }
    let handleConfirm = (event) => {
       console.log(localSongInfo);

        store.saveEditedSong(localSongInfo.title,
            localSongInfo.artist, 
            localSongInfo.youTubeId);
    }
    let titleInput = document.getElementById("edit-song-modal-title-textfield")
    let artistInput = document.getElementById("edit-song-modal-artist-textfield")
    let youTubeIdInput = document.getElementById("edit-song-modal-youTubeId-textfield")

    if (titleInput){
        titleInput.value = localSongInfo.title;
        artistInput.value =localSongInfo.artist;
        youTubeIdInput.value = localSongInfo.youTubeId;
    }

    return (
        <div
            class={"modal " + (store.markSongForEditing ? "is-visible" : "")} 
            id="edit-song-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-edit-song-root'>
                    <div class="modal-north">
                        Edit Song
                    </div>
                    <div class="modal-center">
                        <div class="modal-center-content" id="edit-song-info-div">

                                <span id="title-prompt">Title:</span>
                                <input defaultValue={localSongInfo.title} onChange={handleChangeTitle} id="edit-song-modal-title-textfield"></input>

                                <span id="artist-prompt">Artist:</span>
                                <input defaultValue={localSongInfo.artist} onChange={handleChangeArtist} id="edit-song-modal-artist-textfield"></input>

                                <span id="you-tube-id-prompt">YouTubeId:</span>
                                <input defaultValue={localSongInfo.youTubeId} onChange={handleChangeLink} id="edit-song-modal-youTubeId-textfield"></input>

                            
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            class="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            class="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}


export default EditSongModal;