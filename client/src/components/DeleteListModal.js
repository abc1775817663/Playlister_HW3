import { useContext, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal() {
    const {store} = useContext(GlobalStoreContext);
    console.log(store.markListForDeletion);
        return (
            <div 
                class={"modal" + (store.markListForDeletion ? " is-visible" : "")}
                id="delete-list-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-delete-list-root'>
                        <div class="modal-north">
                            Delete playlist?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                                Are you sure you wish to permanently delete the <b>{store.markListForDeletion? store.markListForDeletion.name:""}</b> playlist?
                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                class="modal-button" 
                                onClick={store.deleteList}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                class="modal-button" 
                                onClick={store.hideDeleteListModal}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    
}


export default DeleteListModal;