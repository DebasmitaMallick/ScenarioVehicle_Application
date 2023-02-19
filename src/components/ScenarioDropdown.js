import React from 'react'

function ScenarioDropdown(props) {
  return (
    <div>
      <label className='grid-item name'>Scenario List <br />
        <select value={props.scenario} onChange={e => {props.setScenario(e.target.value);}}>
          <option value="" disabled selected hidden>Select a Scenario</option>
            {props.scenarios.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
      </label>
    </div>
  )
}

export default ScenarioDropdown