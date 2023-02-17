import React, {useState, useEffect} from 'react';
import axios from 'axios';
import VehicleItem from './VehicleItem';
import ScenarioDropdown from './ScenarioDropdown';
import './scenarioStyles.css';
import { toast } from 'react-toastify';
import DeleteAlert from './DeleteAlert';

function Home() {
  const [scenarios, setScenarios] = useState([]);
  const [scenario, setScenario] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const appUrl = process.env.REACT_APP_APP_URL;
  const [isRefresh, setIsRefresh] = useState(Math.random()*100);

  const confirmDelete = () => {
    toast.warning(<DeleteAlert delete = {deleteAllHandler} message = {'Are you sure you want to delete the scenarios?'} /> , {position: toast.POSITION.TOP_CENTER, closeButton: false});
  };

  const deleteAllHandler = () => {
    axios.get(`http://localhost:3001/scenarios`, {
      params: {
        id: 205

      }
    })
}

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
                          <VehicleItem key={vehicle.id} vehicle = {vehicle} delete = {confirmDelete}  />
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