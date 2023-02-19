import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import './addVehicles.css';
import axios from 'axios';
import ScenarioDropdown from './ScenarioDropdown';
import { toast } from "react-toastify";

function AddVehiclesForm() {
  const location = useLocation();
  const [scenarios, setScenarios] = useState([]);
  const [scenario, setScenario] = useState(location.state ? location.state.id : '');
  const [vehicleName, setVehicleName] = useState('');
  const [speed, setSpeed] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');
  const [prev, setPrev] = useState([]);
  const appUrl = process.env.REACT_APP_APP_URL;

    const submitHandler = (e) => {
      let x = [];
      //let y;
      e.preventDefault();
      let vehicleId = Math.floor(Math.random()*1000);
      axios
      .post(`${appUrl}/vehicles`, {
        id: vehicleId,
        name: vehicleName,
        speed: speed,
        positionX: positionX,
        positionY: positionY,
        direction: direction,
        scenarioId: scenario
      })
      .then(() => {
        //update parent scenario
        axios.get(`${appUrl}/scenarios/${scenario}`).then((res) => {
          x = res.data.vehicles;
          x.push(vehicleId);
          const temp = x;
          axios
          .patch(`${appUrl}/scenarios/${scenario}`, {
              vehicles : temp
          }).then(() => {
            toast.success("Added Successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            resetHandler();
            setPrev([]);
          });
          });
      });
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

          <ScenarioDropdown scenarios={scenarios} setScenario = {setScenario} scenario={scenario} />
          
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