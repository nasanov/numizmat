import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CollectionBlock from './CollectionBlock'
import './Collection.css'

export default function Collection() {


	const collections = useSelector(state => state.collections);
	// console.log(collections);
	let arr = []
	for (let i in collections) {
		arr.push(collections[i])
	}

	return (
		<div className="collection-list__container">
			{arr.map(collection => {
				return <CollectionBlock collection={collection} key={collection.id} />;
			})}
			<div className="collection__container">
				<div>
					<i class="fas fa-plus add-collection_img"></i>
				</div>
				<button className="collection__add-collection--btn">Add New collection</button>
			</div>
		</div>
	)
}
