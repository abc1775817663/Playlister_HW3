import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    function handleAdd() {
        store.addAddSongTransaction();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    // let editStatus = false;
    // if (store.listNameEditActive) {
    //     editStatus = true;
    // }
    let modalVisible = store.markSongForEditing != null || store.markSongForDeletionIdx!=null || store.markListForDeletion!=null;
    // console.log(modalVisible);
    // console.log(store.markSongForEditing);
    let addButtonDisabled = store.currentList == null || modalVisible;
    let closeButtonDisabled = store.currentList == null || modalVisible;
    let redoButtonDisabled = store.currentList == null || !store.hasTransactionToRedo() || modalVisible;
    let undoButtonDisabled = store.currentList == null || !store.hasTransactionToUndo() || modalVisible;
    
    
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={addButtonDisabled}
                value="+"
                className={enabledButtonClass + (addButtonDisabled?" disabled":"")}
                onClick={handleAdd}
            />
            <input
                type="button"
                id='undo-button'
                disabled={undoButtonDisabled}
                value="⟲"
                className={enabledButtonClass + (undoButtonDisabled? " disabled":"")}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={redoButtonDisabled}
                value="⟳"
                className={enabledButtonClass + (redoButtonDisabled? " disabled":"")}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={closeButtonDisabled}
                value="&#x2715;"
                className={enabledButtonClass + (closeButtonDisabled? " disabled": "")}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;