import React, {useState} from 'react'

function ScenarioEditBody(props) {
    // const [name, setName] = useState(props.name);
    // const [time, setTime] = useState(props.time);
  return (
    <form >
        <div className="grid-container"> 

            <label className='grid-item'>Scenario Name <br />
                <input type="text" value={props.name} onChange={e => props.setName(e.target.value)} />
            </label>

            <label className='grid-item'>Scenario Time (seconds) <br />
                <input type="number" value={props.time} onChange={e => props.setTime(e.target.value)} />
            </label>

        </div>
    </form>
  )
}

export default ScenarioEditBody