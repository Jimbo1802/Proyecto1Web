import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Pokedex from './Pokedex';
import Regions from './Regions';
import Moves from './Moves';
import Learn from './About';
import Contact from './ContactUs';

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/pokedex" component={Pokedex} />
                <Route path="/regiones" component={Regions} />
                <Route path="/movimientos" component={Moves} />
                <Route path="/aprende" component={Learn} />
                <Route path="/contactanos" component={Contact} />
                <Route path="/" exact component={Pokedex} /> {/* Página principal */}
            </Switch>
        </Router>
    );
}

export default App;

