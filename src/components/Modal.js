import React, { ReactDom} from 'react';
import './modalStyle.css';
import './addVehicles.css';

function Modal(props) {
    
    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{props.title}</h2>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button className='button green-btn' onClick={props.handleSave}>Save</button>
                    <button onClick={props.onClose} className="button red-btn">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal