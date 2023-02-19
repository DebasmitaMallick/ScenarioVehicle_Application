import axios from 'axios';
import React, {useState} from 'react'
import {FaPlusCircle, FaPencilAlt, FaTrash} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteAlert from './DeleteAlert';
import Modal from './Modal';
import ScenarioEditBody from './ScenarioEditBody';

function ScenarioItem(props) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [name, setName] = useState(props.scenario.name);
    const [time, setTime] = useState(props.scenario.time);
    const [prevName, setPrevName] = useState(props.scenario.name);
    const [prevTime, setPrevTime] = useState(props.scenario.time);
    const appUrl = process.env.REACT_APP_APP_URL;

    const deleteScenario = () => {
        axios.delete(`${appUrl}/scenarios/`+props.scenario.id)
        .then(() => {
            //delete the child vehicles
            let urls = props.scenario.vehicles.map((id) => {
                return `${appUrl}/vehicles/${id}`;
            });
            let deleteRequests = urls.map((url) => axios.delete(url));
            axios.all(deleteRequests).then((responses) => {
            responses.forEach((resp) => {
                let msg = {
                server: resp.headers.server,
                status: resp.status,
                fields: Object.keys(resp.data).toString(),
                };
                console.info(resp.config.url);
                console.table(msg);
            });
                toast.success('Deleted Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
                props.refresh(!props.isRefresh);
            });
        });
    }

    const confirmDelete = () => {
        toast.warning(<DeleteAlert delete = {deleteScenario} message = {'Are you sure you want to delete this scenario?'} /> , {position: toast.POSITION.TOP_CENTER, closeButton: false});
    }

    const editScenario = () => {
        if(name != prevName || time != prevTime) {
            axios
            .patch(`${appUrl}/scenarios/${props.scenario.id}`, {
                name: name,
                time: time
            }).then(() => {
                toast.success('Updated Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
                setPrevName(name);
                setPrevTime(time);
            });
        }
    }
    
    return (
        <>
            <tr>    
                <td>{props.scenario.id}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>{props.scenario.vehicles.length}</td>
                <td><Link to='/addvehiclesform' state={props.scenario}><FaPlusCircle className='add-icon' /></Link></td>
                <td className='pointer' onClick={() => setShowEditModal(true)}><FaPencilAlt className='edit-icon' /></td>
                <td className='pointer' onClick={confirmDelete}><FaTrash className='trash-icon' /></td>
                <Modal title='Edit Scenario' onClose={() => setShowEditModal(false)} show={showEditModal} handleSave={editScenario} >
                    <ScenarioEditBody name={name} time={time} setName = {setName} setTime = {setTime} />
                </Modal>
            </tr>
        </>
    )
}

export default ScenarioItem