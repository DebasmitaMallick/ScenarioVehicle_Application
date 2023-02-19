import React, { useEffect, useState } from "react";
import "./allScenario.css";
import DeleteAlert from "./DeleteAlert";
import ScenarioItem from "./ScenarioItem";
import "./scenarioStyles.css";
import { toast } from "react-toastify";
import axios from "axios";
import ScenarioItemBtn from "./ScenarioItemBtn";

function AllScenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const appUrl = process.env.REACT_APP_APP_URL;

  useEffect(() => {
    axios.get(`${appUrl}/scenarios`).then((response) => {
      setScenarios(response.data);
    });
  }, [isRefresh]);

  const deleteAllHandler = () => {
    let urls = [];
    for (let i = 0; i < scenarios.length; i++) {
      urls.push(`${appUrl}/scenarios/${scenarios[i].id}`);
      scenarios[i].vehicles.forEach(v => {
        urls.push(`${appUrl}/vehicles/${v}`);
      });
    }

    let deleteAllRequests = urls.map((url) => axios.delete(url));
    // console.log(deleteAllRequests);

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
      setIsRefresh(!isRefresh);
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

  if(scenarios.length === 0) {
    return (
      <>
        <ScenarioItemBtn cls = {'isInvisible'} delete = {null} clsTxt = {'isInvisible'} />
        <h1>No data Available</h1>
      </>
    )
  }

  return (
    <>
      <ScenarioItemBtn cls = {'button orange-btn'} delete = {confirmDelete} clsTxt = {''} />

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
                  isRefresh = {isRefresh}
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
