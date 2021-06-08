import React, { useState } from 'react';

import { Modal } from '../../../../context/Modal';
import AddToCollectionForm from './AddToCollectionForm';

export default function AddToCollectionModal({ coin }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div onClick={() => setShowModal(true)}>
				<button className="sidebar-add-to-collection--btn">Add to Collection</button>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddToCollectionForm setShowModal={setShowModal} coin={coin} />
				</Modal>
			)}
		</>
	);
}
