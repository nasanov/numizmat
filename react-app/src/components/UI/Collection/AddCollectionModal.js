import React, { useState } from 'react';

import { Modal } from '../../../context/Modal';
import AddCollectionForm from './AddCollectionForm';

export default function AddCollectionModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="collection__container" onClick={() => setShowModal(true)}>
				<div>
					<i class="fas fa-plus add-collection_img"></i>
				</div>
				<button className="sidebar-add-to-collection--btn">Add New Collection</button>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddCollectionForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}
