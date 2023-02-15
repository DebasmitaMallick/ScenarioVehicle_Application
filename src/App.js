import React from 'react';
import './App.css';
import AddScenarioForm from './components/AddScenarioForm';
import AddVehiclesForm from './components/AddVehiclesForm';
import AllScenarios from './components/AllScenarios';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='main-comp-container'>
          <Routes>
            <Route path='/addscenario' element={<AddScenarioForm/>} />
            <Route path='/allscenarios' element={<AllScenarios/>} />
            <Route path='/addvehiclesform' element={<AddVehiclesForm/>} />
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
