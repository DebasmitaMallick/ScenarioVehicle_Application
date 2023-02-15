import React, {useEffect, useState} from 'react';
import './allScenario.css';

function AllScenarios() {
    const [scenarios, setScenarios] = useState([])
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/scenarios')
        .then((res) => res.json())
        .then((res) => {
            setScenarios(res);
        })
    }, []);
    useEffect(() => {
        fetch('http://localhost:3001/vehicles')
        .then((res) => res.json())
        .then((res) => {
            setVehicles(res);
        })
    }, []);
    return (
        <>
            <div id='all-scenarios'>
                <h1>All Scenarios</h1>
                <table id='scenarios'>
                    <thead>
                        <tr>
                            <th>Scenario id</th>
                            <th>Scenario Name</th>
                            <th>Scenario Time</th>
                            <th>Number of Vehicles</th>
                            {/* <th>Add Vehicles</th>
                            <th>Edit</th>
                            <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {
                        scenarios.map(sc => {
                            return (
                                <tr key={sc.id}>
                                    <td>{sc.id}</td>
                                    <td>{sc.name}</td>
                                    <td>{sc.time}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllScenarios