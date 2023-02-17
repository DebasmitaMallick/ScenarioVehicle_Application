import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import './addVehicles.css';
import axios from 'axios';
import ScenarioDropdown from './ScenarioDropdown';

function AddVehiclesForm() {
  const location = useLocation();
  console.log(location.state);
  const [scenarios, setScenarios] = useState([]);
  const [scenario, setScenario] = useState(location.state ? location.state : '');
  const [vehicleName, setVehicleName] = useState('');
  const [speed, setSpeed] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');
  const appUrl = process.env.REACT_APP_APP_URL;

    const submitHandler = (e) => {
      e.preventDefault();
      //fetch(`http://localhost:3001/scenarios/${scenario}/vehicles`, {
      fetch(`${appUrl}/scenarios`, {
        method: 'POST',
        body: JSON.stringify({
            id: Math.floor(Math.random()*1000),
            name: vehicleName,
            speed: speed,
            positionX: positionX,
            positionY: positionY,
            direction: direction
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    
    const resetHandler = e => {
      setScenario('');
      setVehicleName('');
      setSpeed('');
      setPositionX('');
      setPositionY('');
      setDirection('');
    }
  
    useEffect(() => {
        axios.get(`${appUrl}/scenarios`).then((response) => {
            setScenarios(response.data);
          });
    }, []);

  const directions = [
    {
      label: "Towards",
      value: "Towards",
    },
    {
      label: "Backwards",
      value: "Backwards",
    },
    {
      label: "Upwards",
      value: "Upwards",
    },
    {
      label: "Downwards",
      value: "Downwards",
    },
  ];
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="grid-container add-vehicle-form">
          {/* <label className='grid-item name'>Scenario List <br />
            <select value={scenario} onChange={e => setScenario(e.target.value)}>
              <option value="" disabled selected hidden>Select a Scenario</option>
                {scenarios.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
          </label> */}
          <ScenarioDropdown scenarios={scenarios} setScenario = {setScenario} />
          <label className='grid-item name'>Vehicle Name <br />
              <input type="text" placeholder='Test Scenario' value={vehicleName} onChange={e => setVehicleName(e.target.value)} required />
          </label>
          <label className='grid-item name'>Speed <br />
              <input type="text" placeholder='Test Scenario' value={speed} onChange={e => setSpeed(e.target.value)} required />
          </label>
          <label className='grid-item name'>Position X <br />
              <input type="text" placeholder='Test Scenario' value={positionX} onChange={e => setPositionX(e.target.value)} required />
          </label>
          <label className='grid-item name'>Position Y <br />
              <input type="text" placeholder='Test Scenario' value={positionY} onChange={e => setPositionY(e.target.value)} required />
          </label>
          <label className='grid-item name'>Direction <br />
            <select value={direction} onChange={e => setDirection(e.target.value)}>
              <option value="" disabled selected hidden>Select a direction</option>
                {directions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
          </label>
        </div>
        <button className='button green-btn' type='submit'>Add</button>
        <button className='button orange-btn' onClick={resetHandler}>Reset</button>
      </form>
    </>
  )
}

export default AddVehiclesForm