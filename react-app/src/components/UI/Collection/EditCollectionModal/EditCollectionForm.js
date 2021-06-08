import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ############################################################### //
// ############################  CSS  ############################ //
// ############################################################### //
import './EditCollectionForm.css';

// ################################################################## //
// ############################  STORES  ############################ //
// ################################################################## //

import { modifyCollection } from '../../../../store/collections';

export default function EditCollectionForm({ setShowModal, collection }) {
	const dispatch = useDispatch();

	const [name, setName] = useState(collection.name);
	const [errors, setErrors] = useState([]);
	const { user } = useSelector(state => state.session);

	if (!user) {
		return <Redirect to="/login" />;
	}

	const handleSubmit = async e => {
		e.preventDefault();

		let editedCollection = await dispatch(modifyCollection(collection.id, name));

		if (editedCollection.name) {
			setShowModal(false);
		} else {
			setErrors(editedCollection.errors);
		}
	};

	return (
		<div className="collection-form__div">
			<form className="collection-form__main" onSubmit={handleSubmit}>
				<div className="collection-form__div">
					<input
						className="collection-form__input"
						type="text"
						placeholder="name"
						value={name}
						required
						onChange={e => setName(e.target.value)}
					></input>
				</div>
				<button className="collection-form__button" type="submit">
					Edit Collection
				</button>
			</form>
		</div>
	);
}
