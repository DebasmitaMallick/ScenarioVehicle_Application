import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleItem from "./VehicleItem";
import ScenarioDropdown from "./ScenarioDropdown";
import "./scenarioStyles.css";

function Home() {
  const [scenarios, setScenarios] = useState([]);
  const [scenario, setScenario] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const appUrl = process.env.REACT_APP_APP_URL;
  const [isRefresh, setIsRefresh] = useState(false);
  const [refreshRequireVehicles, setRefreshRequireVehicles] = useState(false);
  const [requiredVehicles, setRequiredVehicles] = useState([]);

  useEffect(() => {
    axios.get(`${appUrl}/scenarios`).then((response) => {
      setScenarios(response.data);
    });
  }, [isRefresh]);

  useEffect(() => {
    axios.get(`${appUrl}/vehicles`).then((response) => {
      setVehicles(response.data);
      setRefreshRequireVehicles(!refreshRequireVehicles);
    });
  }, [isRefresh]);

   
  useEffect(() => {
    if(vehicles != undefined && vehicles.length > 0 && scenario !== "") {
      const filteredVehicles = vehicles.filter(item => {
        return item.scenarioId.toString().includes(scenario)
      })
      setRequiredVehicles(filteredVehicles);
    }

  }, [scenario, refreshRequireVehicles]);
  

  if(scenario !== "" && requiredVehicles.length === 0) {
    return (
      <>
        <ScenarioDropdown scenario = {scenario} scenarios={scenarios} setScenario={setScenario} />
        <h2>No data available</h2>
      </>
    )
  }
  else if (scenario === "") {
    return <ScenarioDropdown scenario = {scenario} scenarios={scenarios} setScenario={setScenario} />;
  }

  return (
    <>
      <ScenarioDropdown scenario = {scenario} scenarios={scenarios} setScenario={setScenario} />
      <div>
        <table id="vehicles">
          <thead>
            <tr>
              <th>Vehicle id</th>
              <th>Vehicle Name</th>
              <th>Position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {requiredVehicles.map((vehicle) => {
              return (
                <VehicleItem
                  key={vehicle.id}
                  vehicle={vehicle}
                  refresh={setIsRefresh}
                  isRefresh={isRefresh}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
