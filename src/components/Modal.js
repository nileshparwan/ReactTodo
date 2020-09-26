import React from 'react';
import './Modal.css';
import CloseIcon from '@material-ui/icons/Close';

export const POSITION = {
    DEFAULT: "",
    MEDIUM: "medium"
};

function Modal({ className, title, modalHandler, children, position = POSITION.DEFAULT }) {
    return (
        <div onClick={modalHandler} role="button" className={`modal ${className || ""}`}>
            <div role="button" onClick={e => e.stopPropagation()} className={`modal__row ${position}`}>
                <div className="modal__col">
                    {title && (<h2 className="modal__title">{title}</h2>)}
                    <div className="modal__body">
                        {children}
                    </div>
                    <button onClick={modalHandler} className="close"><CloseIcon /></button>
                </div>

            </div>
        </div >
    );
}

export default Modal;
