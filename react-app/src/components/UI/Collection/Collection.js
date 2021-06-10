import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import CollectionBlock from './CollectionBlock';
import AddCollectionModal from './AddCollectionModal/AddCollectionModal';
import './Collection.css';
import { getCollections } from '../../../store/collections';
export default function Collection() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCollections());
	}, [dispatch]);
	const collections = useSelector(state => state.collections);

	// console.log(collections);
	let arr = [];
	for (let i in collections) {
		arr.push(collections[i]);
	}

	return (
		<>
			<NavBar />
			<div className="collection-list__container">
				{arr.map(collection => {
					if (collection.name !== 'Wishlist') {
						return <CollectionBlock collection={collection} key={collection.id} />;
					} else {
						return null;
					}
				})}
				<AddCollectionModal />
			</div>
		</>
	);
}
