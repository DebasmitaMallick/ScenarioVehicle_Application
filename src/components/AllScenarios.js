import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./allScenario.css";
import DeleteAlert from "./DeleteAlert";
import ScenarioItem from "./ScenarioItem";
import "./scenarioStyles.css";
import { toast } from "react-toastify";
import axios from "axios";

function AllScenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [isRefresh, setIsRefresh] = useState(Math.random() * 100);
  const appUrl = process.env.REACT_APP_APP_URL;

  useEffect(() => {
    axios.get(`${appUrl}/scenarios`).then((response) => {
      setScenarios(response.data);
    });
  }, [isRefresh]);

  // if(scenarios.length == 0) {
  //     return (
  //         <h2>No Data Available</h2>
  //     )
  // }

  const deleteAllHandler = () => {
    let urls = scenarios.map((sc) => {
      return `${appUrl}/scenarios/${sc.id}`;
    });
    let deleteAllRequests = urls.map((url) => axios.delete(url));
    axios.all(deleteAllRequests).then((responses) => {
      responses.forEach((resp) => {
        let msg = {
          server: resp.headers.server,
          status: resp.status,
          fields: Object.keys(resp.data).toString(),
        };
        console.info(resp.config.url);
        console.table(msg);
      });
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setIsRefresh(Math.random() * 100);
    });
  };
  const confirmDelete = () => {
    toast.warning(
      <DeleteAlert
        delete={deleteAllHandler}
        message={"Are you sure you want to delete all the scenarios?"}
      />,
      { position: toast.POSITION.TOP_CENTER, closeButton: false }
    );
  };

  return (
    <>
      <div className="grid-container all-scenario-header">
        <div className="grid-item">
          <h2>All Scenarios</h2>
        </div>
        <div className="grid-item">
          <Link className="button blue-btn" to="/addscenario">
            New Scenario
          </Link>
          <Link className="button green-btn" to="/addvehiclesform">
            Add Vehicles
          </Link>
          <div className="button orange-btn" onClick={confirmDelete}>
            Delete All
          </div>
        </div>
      </div>

      <div id="all-scenarios">
        <h1>All Scenarios</h1>
        <table id="scenarios">
          <thead>
            <tr>
              <th>Scenario id</th>
              <th>Scenario Name</th>
              <th>Scenario Time</th>
              <th>Number of Vehicles</th>
              <th>Add Vehicles</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((sc) => {
              return (
                <ScenarioItem
                  key={sc.id}
                  scenario={sc}
                  refresh={setIsRefresh}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllScenarios;
