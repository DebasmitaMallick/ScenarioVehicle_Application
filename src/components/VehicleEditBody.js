import React from 'react'

function VehicleEditBody(props) {
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
        <form >
            <div className="grid-container"> 

                <label className='grid-item'>Name <br />
                    <input type="text" value={props.name} onChange={e => props.setName(e.target.value)} />
                </label>

                <label className='grid-item'>PositionX <br />
                    <input type="number" value={props.positionX} onChange={e => props.setPositionX(e.target.value)} />
                </label>

                <label className='grid-item'>PositionY <br />
                    <input type="number" value={props.positionY} onChange={e => props.setPositionY(e.target.value)} />
                </label>

                <label className='grid-item'>Speed <br />
                    <input type="number" value={props.speed} onChange={e => props.setSpeed(e.target.value)} />
                </label>

                <label className='grid-item'>Direction <br />
                    <select value={props.direction} onChange={e => props.setDirection(e.target.value)}>
                        <option value="" disabled selected hidden>Select a direction</option>
                        {directions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>

            </div>
        </form>
    )
}

export default VehicleEditBody