import axios from 'axios';
import React, { useState } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';
import DeleteAlert from './DeleteAlert';
import Modal from './Modal';
import VehicleEditBody from './VehicleEditBody';

function VehicleItem(props) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [name, setName] = useState(props.vehicle.name);
    const [speed, setSpeed] = useState(props.vehicle.speed);
    const [positionX, setPositionX] = useState(props.vehicle.positionX);
    const [positionY, setPositionY] = useState(props.vehicle.positionY);
    const [direction, setDirection] = useState(props.vehicle.direction);
    const [namePrev, setNamePrev] = useState(props.vehicle.name);
    const [speedPrev, setSpeedPrev] = useState(props.vehicle.speed);
    const [positionXPrev, setPositionXPrev] = useState(props.vehicle.positionX);
    const [positionYPrev, setPositionYPrev] = useState(props.vehicle.positionY);
    const [directionPrev, setDirectionPrev] = useState(props.vehicle.direction);
    const appUrl = process.env.REACT_APP_APP_URL;

    const editVehicle = () => {
        if(name !== namePrev || positionX !== positionXPrev || positionY !== positionYPrev || direction !== directionPrev || speed !== speedPrev) {
            axios
            .patch(`${appUrl}/vehicles/${props.vehicle.id}`, {
                name: name,
                positionX: positionX,
                positionY: positionY,
                speed: speed,
                direction: direction
            }).then(() => {
                toast.success('Updated Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
                setNamePrev(name);
                setPositionXPrev(positionX);
                setPositionYPrev(positionY);
                setSpeedPrev(speed);
                setDirectionPrev(direction);
                props.refresh(!props.isRefresh);
            });
        }
    }

    const confirmDelete = () => {
        toast.warning(
          <DeleteAlert
            delete={deleteHandler}
            message={"Are you sure you want to delete the vehicle?"}
          />,
          { position: toast.POSITION.TOP_CENTER, closeButton: false }
        );
      };
    
      const deleteHandler = () => {
        axios.delete(`${appUrl}/vehicles/`+props.vehicle.id)
          .then((response) => {
            //update parent scenario
            axios.get(`${appUrl}/scenarios/${props.vehicle.scenarioId}`).then((res) => {
                let x = res.data.vehicles;
                console.log(x);
                console.log('at 0 '+x[0]);
                const index = x.indexOf(props.vehicle.id);
                console.log('index'+index);
                x.splice(index, 1);
                const temp = x;
                console.log(temp);
                axios
                .patch(`${appUrl}/scenarios/${props.vehicle.scenarioId}`, {
                    vehicles : temp
                }).then(() => {
                  toast.success("Deleted Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
                  props.refresh(!props.isRefresh);
                });
                });
          });
      };

    return (
        <tr>    
            <td>{props.vehicle.id}</td>
            <td>{props.vehicle.name}</td>
            <td>{props.vehicle.positionX}</td>
            <td>{props.vehicle.positionY}</td>
            <td>{props.vehicle.speed}</td>
            <td>{props.vehicle.direction}</td>
            <td className='pointer' onClick={() => setShowEditModal(true)}><FaPencilAlt className='edit-icon' /></td>
            <td className='pointer' onClick={confirmDelete}><FaTrash className='trash-icon' /></td>
            <Modal title='Edit Vehicle' onClose={() => setShowEditModal(false)} show={showEditModal} handleSave={editVehicle} >
                <VehicleEditBody name={name} speed={speed} positionX={positionX} positionY={positionY} direction={direction} setName = {setName} setSpeed = {setSpeed} setPositionX={setPositionX} setPositionY={setPositionY} setDirection={setDirection} />
            </Modal>
        </tr>
  )
}

export default VehicleItem