import React, {useState, useEffect} from 'react';
import axios from 'axios';
import VehicleItem from './VehicleItem';
import ScenarioDropdown from './ScenarioDropdown';
import './scenarioStyles.css';

function Home() {
  const [scenarios, setScenarios] = useState([]);
  const [scenario, setScenario] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const appUrl = process.env.REACT_APP_APP_URL;

  useEffect(() => {
      axios.get(`${appUrl}/scenarios`).then((response) => {
          setScenarios(response.data);
        });
  }, []);

  useEffect(() => {
      axios.get(`${appUrl}/scenarios/`+scenario).then((response) => {
          setVehicles(response.data.vehicles);
        });
  }, [scenario]);
  
  if(!(Array.isArray(vehicles) && vehicles.length > 0)) {
    return <ScenarioDropdown scenarios={scenarios} setScenario = {setScenario} />
  }

  return (
    <>
        <ScenarioDropdown scenarios={scenarios} setScenario = {setScenario}  />
        <div>
          <table id='vehicles'>
              <thead>
                  <tr>
                      <th>Vehicle id</th>
                      <th>Vehicle Name</th>
                      <th>Position X</th>
                      <th>Position Y</th>
                      <th>Speed</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
              {
                  vehicles.map(vehicle => {
                      return (
                          <VehicleItem key={vehicle.id} vehicle = {vehicle}  />
                      )
                  })
              }
              </tbody>
          </table>
        </div>
    </>
  )
}

export default Home