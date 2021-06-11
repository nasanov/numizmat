/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';

/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../../context/Modal';
import EditCoinForm from './EditCoinForm';
// import UserProfile from './UserProfile';
// import ProfilePhoto from './ProfilePhoto';

/*************************** COMPONENTS ***************************/

export default function EditCoinModal({ coin }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="edit__coin--btn" onClick={() => setShowModal(true)}>
				<i class="far fa-edit edit__btn--pen"></i>Edit coin
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditCoinForm setShowModal={setShowModal} coin={coin} />
				</Modal>
			)}
		</>
	);
}
