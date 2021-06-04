import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export default function ModalProvider({ children }) {
	const modalRef = useRef(); // ! check the value
	const [value, setValue] = useState();

	useEffect(() => {
		setValue(modalRef.current);
	}, []);

	return (
		<>
			<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
}

export function Modal({ onClose, children }) {
	const modalNode = useContext(ModalContext);
	if (!modalNode) return null;
	return ReactDOM.createPortal(
		<div id="modal">
			<div id="modal__background" onClick={onClose} />
			<div id="modal__content">{children}</div>
		</div>,
		modalNode
	);
}
