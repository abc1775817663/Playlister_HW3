import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, DeleteListModal, ListSelector, PlaylistCards, Statusbar } from './components'
import { GlobalStoreContext } from './store'
import EditSongModal from './components/EditSongModal';
import DeleteSongModal from './components/DeleteSongModal';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/


const App = () => {
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
                
            </Switch>
            <Statusbar />
        <DeleteListModal/>
        <DeleteSongModal/>
        <EditSongModal/>
        </Router>
    )
}

export default App