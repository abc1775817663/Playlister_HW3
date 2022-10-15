import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CLEAR_MARK_LIST: "CLEAR_MARKED_LIST",
    DELETE_LIST: "DELETE_LIST",
    ADD_NEW_SONG: "ADD_NEW_SONG",
    MARK_SONG_FOR_EDITING: "MARK_SONG_FOR_EDITING",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    CLEAR_MARK_SONG: "CLEAR_MARK_SONG",
    UPDATE: "UPDATE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markListForDeletion: null,
        markSongForEditing: null,
        songInfoActive: false
        
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: payload,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDITING: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: payload,
                    songInfoActive: true
                });
            }
            // FINISHED DELETE A LIST
            case GlobalStoreActionType.CLEAR_MARK_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }

            case GlobalStoreActionType.CLEAR_MARK_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: null,
                    songInfoActive: false
                });
            }

            // DELETE A LIST
            case GlobalStoreActionType.DELETE_LIST: {
                console.log(payload);
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            case GlobalStoreActionType.ADD_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            case GlobalStoreActionType.UPDATE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    markListForDeletion: store.markListForDeletion,
                    markSongForEditing: store.markSongForEditing,
                    songInfoActive: false
                });
            }
            default:
                return store;
        }
    }
    store.showDeleteListModal = async function(_id){
        let markedList = store.idNamePairs.filter(list => list._id === _id)[0];
        console.log(markedList)
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: markedList
        });
    }

    store.showEditSongModal = async function(idx){
        let markedSong = this.currentList.songs[idx];
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDITING,
            payload: markedSong
        });
    }

    store.hideDeleteListModal = async function(){
        console.log("hiding the modal...");
        storeReducer({
            type: GlobalStoreActionType.CLEAR_MARK_LIST,
        });
    }

    store.hideEditSongModal = async function(){
        console.log("hiding the modal...");
        storeReducer({
            type: GlobalStoreActionType.CLEAR_MARK_SONG
        });
    }
    store.deleteList = async function(){
        

        let _id = store.markListForDeletion._id;
        await api.deleteListById(_id);
        let updatedNamePairs = store.idNamePairs.filter(list => list._id !== _id);

        console.log(updatedNamePairs);

        storeReducer({
            type: GlobalStoreActionType.DELETE_LIST,
            payload: updatedNamePairs
            
        });

        // console.log(store.markListForDeletion);

        
        
    }
    store.addNewSong = async function() {
        this.currentList.songs.push({artist: "Unknown", title: "Untitled", youTubeId: "dQw4w9WgXcQ"});
        await api.updatePlaylistById(this.currentList._id, this.currentList)
        storeReducer({
            type: GlobalStoreActionType.ADD_NEW_SONG,
            payload: this.currentList
        });
    }

    store.createNewList = async function(){
        let list = {
            name: "Untitled",
            songs: []
        };
        let _id = await (await api.createPlaylist(list)).data.playlist._id;

        await this.loadIdNamePairs();

        
        storeReducer({
            type: GlobalStoreActionType.CREATE_NEW_LIST,
            payload: {
                list
            }
        });
        this.setCurrentList(_id);



        // const response = await api.getPlaylistPairs();
        //     if (response.data.success) {
        //         let pairs = response.data.idNamePairs;
        //         let _id = pairs[pairs.length-1]._id;
        //         document.getElementById("edit-list-"+_id).click();
                
        //     }
        //     else {
        //         console.log("API FAILED TO GET THE LIST PAIRS");
        //     }


    }
    store.saveEditedSong = function(title,artist, youTubeId){
        this.markSongForEditing.artist = artist;
        this.markSongForEditing.title = title;
        this.markSongForEditing.youTubeId = youTubeId;
        api.updatePlaylistById(this.currentList._id, this.currentList);
        this.hideEditSongModal();
        // storeReducer({
        //     type: GlobalStoreActionType.UPDATE
        // });
        

    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            // console.log(response);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    // console.log(response);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
   



    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}