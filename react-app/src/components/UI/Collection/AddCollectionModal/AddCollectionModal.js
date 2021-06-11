import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../../../context/Modal';
import AddCollectionForm from './AddCollectionForm';
import { getCollections } from '../../../../store/collections';

export default function AddCollectionModal() {
	const [showModal, setShowModal] = useState(false);
	const [fileToImport, setFileToImport] = useState('');
	const dispatch = useDispatch();

	const importNewCollection = async () => {
		const formData = new FormData();
		formData.append('fileToImport', fileToImport);
		// console.log(formData);
		// console.log(fileToImport);
		const res = await fetch(`/api/collections/import/`, {
			method: 'POST',
			body: formData,
		});
		const data = await res.json();
		dispatch(getCollections());
	};

	return (
		<>
			<div className="collection__container">
				<div className="collection__container--buttons">
					<button className="sidebar-add-to-collection--btn" onClick={() => setShowModal(true)}>
						Add New Collection
					</button>
					<div className="collection-list__import-export--btns">
						<input
							type="file"
							id="importCsv"
							onChange={e => setFileToImport(e.target.files[0])}
							hidden
							accept="text/csv"
						/>
						<label htmlFor="importCsv" className="collection__importCSV--label">
							{fileToImport?.name ? fileToImport?.name : 'File To Import'}
						</label>
						<button className="collection__importCSV--btn" onClick={() => importNewCollection()}>
							<i class="fas fa-upload"></i>Import Collection
						</button>
					</div>
				</div>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddCollectionForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}
