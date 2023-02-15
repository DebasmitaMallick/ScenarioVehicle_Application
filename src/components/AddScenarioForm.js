import React, {useState} from 'react'
import './addScenario.css';

function AddScenarioForm() {
    const [scenarioName, setScenarioName] = useState('');
    const [scenarioTime, setScenarioTime] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        fetch('http://localhost:3001/scenarios', {
        method: 'POST',
        body: JSON.stringify({
            id: Math.floor(Math.random()*1000),
            name: scenarioName,
            time: scenarioTime,
            vehicles: []
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    };

    const resetHandler = e => {
        setScenarioName('');
        setScenarioTime('');
    }

    return (
        <>
            <h1>Add Scenario</h1>
            <form onSubmit={submitHandler}>
                <div className='scenario'>

                    <label className='name'>Scenario Name <br />
                        <input type="text" placeholder='Test Scenario' required value={scenarioName} onChange={e => setScenarioName(e.target.value)} />
                    </label>

                    <label className='time'>Scenario Time (seconds) <br />
                        <input type="number" required value={scenarioTime} onChange={e => setScenarioTime(e.target.value)} />
                    </label>

                </div>
                <button className='button add-btn' type='submit'>Add</button>
                <button className='button reset-btn' onClick={resetHandler}>Reset</button>
            </form>
        </>
    )
}

export default AddScenarioForm