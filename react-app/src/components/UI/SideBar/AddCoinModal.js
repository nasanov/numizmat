/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';

/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../context/Modal';
import AddCoinForm from './AddCoinForm';
// import UserProfile from './UserProfile';
// import ProfilePhoto from './ProfilePhoto';

/*************************** COMPONENTS ***************************/

export default function AddCoinModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="sidebar-add-to-collection--btn" onClick={() => setShowModal(true)}>
				Add New Coin
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddCoinForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}
