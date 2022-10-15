import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;

    let moveState = {
        isDragging: false,
        draggedTo: false
    }

    let cardClass = "list-card unselected-list-card";

    let handleEdit = () => {
        store.showEditSongModal(index);
    }

    let handleRemove = () => {
        store.showDeleteSongModal(index);
    }

    let handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        moveState = {
            isDragging: true,
            draggedTo: moveState.draggedTo
        };
    }
    let handleDragOver = (event) => {
        event.preventDefault();
        moveState = {
            isDragging: moveState.isDragging,
            draggedTo: true
        };
    }
    let handleDragEnter = (event) => {
        event.preventDefault();
        moveState = {
            isDragging: moveState.isDragging,
            draggedTo: true
        };
    }
    let handleDragLeave = (event) => {
        event.preventDefault();
        moveState = {
            isDragging: moveState.isDragging,
            draggedTo: false
        };
    }
    let handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.split("-")[1];
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.split("-")[1];
        
        moveState = {
            isDragging: false,
            draggedTo: false
        };
        console.log(sourceId, targetId);
        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceId, targetId);
    }
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleEdit}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleRemove}
                
            />
        </div>
    );
}

export default SongCard;