import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Form from './components/pages/Form'
import MapView from './components/pages/MapView'
import About from './components/pages/About'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Form' exact component={Form} />
          <Route path='/MapView' exact component={MapView} />
          <Route path='/About' exact component={About} />
        </Switch>
      </Router>
    </>
  );
}

export default App;