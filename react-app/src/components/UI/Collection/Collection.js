import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import CollectionBlock from './CollectionBlock';
import AddCollectionModal from './AddCollectionModal';
import './Collection.css';

export default function Collection() {
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
					if (collection.name !== 'Wishlist')
						return <CollectionBlock collection={collection} key={collection.id} />;
				})}
				<AddCollectionModal />
			</div>
		</>
	);
}
