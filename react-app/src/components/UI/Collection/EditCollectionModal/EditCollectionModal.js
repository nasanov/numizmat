import React, { useState } from 'react';

import { Modal } from '../../../../context/Modal';
import EditCollectionForm from './EditCollectionForm';

export default function EditCollectionModal({ collection }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="collection__container" onClick={() => setShowModal(true)}>
				<button className="sidebar-add-to-collection--btn">Edit Collection</button>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditCollectionForm setShowModal={setShowModal} collection={collection} />
				</Modal>
			)}
		</>
	);
}
