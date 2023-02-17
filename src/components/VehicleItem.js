import React from 'react'
import { FaTrash } from 'react-icons/fa'

function VehicleItem(props) {
    return (
        <tr>    
            <td>{props.vehicle.id}</td>
            <td>{props.vehicle.name}</td>
            <td>{props.vehicle.positionX}</td>
            <td>{props.vehicle.positionY}</td>
            <td>{props.vehicle.speed}</td>
            <td>Edit</td>
            {/* <td className='pointer' onClick={() => setShowEditModal(true)}><FaPencilAlt className='edit-icon' /></td> */}
            {/* <td className='pointer' onClick={props.confirmDelete}><FaTrash className='trash-icon' /></td> */}
            {/* <Modal title='Edit Vehicle' onClose={() => setShowEditModal(false)} show={showEditModal} handleSave={editScenario} >
                <ScenarioEditBody name={name} time={time} setName = {setName} setTime = {setTime} />
            </Modal> */}
        </tr>
  )
}

export default VehicleItem