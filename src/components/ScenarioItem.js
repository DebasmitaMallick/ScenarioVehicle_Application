import React, {useState} from 'react'
import {FaPlusCircle, FaPencilAlt, FaTrash} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import ScenarioEditBody from './ScenarioEditBody';

function ScenarioItem(props) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [name, setName] = useState(props.scenario.name);
    const [time, setTime] = useState(props.scenario.time);

    const deleteScenario = () => {
        fetch("http://localhost:3001/scenarios/"+props.scenario.id, {
            method: "DELETE",
        }).then(() => {
            console.log('scenario deleted');
            props.refresh();
        })
    }

    const editScenario = () => {
        if(name != props.scenario.name || time != props.scenario.time) {
            fetch(`http://localhost:3001/scenarios/${props.scenario.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    name: name,
                    time: time
                })
            })
            .then((response) => response.json())
            .then((json) => alert(json));
        }
    }
    
    return (
        <>
            <tr>    
                <td>{props.scenario.id}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>{props.scenario.vehicles.length}</td>
                <td><Link to='/addvehiclesform' state={props.scenario.id}><FaPlusCircle className='add-icon' /></Link></td>
                <td className='pointer' onClick={() => setShowEditModal(true)}><FaPencilAlt className='edit-icon' /></td>
                <td className='pointer' onClick={deleteScenario}><FaTrash className='trash-icon' /></td>
                <Modal title='Edit Scenario' onClose={() => setShowEditModal(false)} show={showEditModal} handleSave={editScenario} >
                    <ScenarioEditBody name={name} time={time} setName = {setName} setTime = {setTime} />
                </Modal>
            </tr>
        </>
    )
}

export default ScenarioItem