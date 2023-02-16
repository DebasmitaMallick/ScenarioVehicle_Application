import React, {useEffect, useState} from 'react';
import './allScenario.css';
import ScenarioItem from './ScenarioItem';

function AllScenarios() {
    const [scenarios, setScenarios] = useState([]);
    const [isRefresh, setIsRefresh] = useState(true);
    useEffect(() => {
        fetch('http://localhost:3001/scenarios')
        .then((res) => res.json())
        .then((res) => {
            setScenarios(res);
        })
    }, [isRefresh]);

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
                            <th>Add Vehicles</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        scenarios.map(sc => {
                            return (
                                <ScenarioItem key={sc.id} scenario = {sc} refresh = {setIsRefresh} />
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