import React, { useState } from 'react';

import { Modal } from '../../../../context/Modal';
import EditCollectionForm from './EditCollectionForm';

export default function EditCollectionModal({ collection }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="edit__collection-btn" onClick={() => setShowModal(true)}>
				<i class="far fa-edit "></i> Edit
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditCollectionForm setShowModal={setShowModal} collection={collection} />
				</Modal>
			)}
		</>
	);
}
