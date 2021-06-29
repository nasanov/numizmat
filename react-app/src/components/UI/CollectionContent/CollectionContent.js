import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './CollectionContent.css';

import { getCollections } from '../../../store/collections';
// import { removeCollection } from '../../../store/collections';
import { removeCoin } from '../../../store/coins';

export default function CollectionContent() {
	const { collectionId } = useParams();
	const dispatch = useDispatch();
	// const collection = useSelector(state => state.collections[collectionId]);
	// console.log(collection);
	useEffect(() => {
		dispatch(getCollections());
	}, [dispatch]);

	const collections = useSelector(state => state.collections);
	const [fileToImport, setFileToImport] = useState('');
	// const [coinsCount, setCoinsCount] = useState(1);

	let current_collection;
	for (let i in collections) {
		// console.log(collections[i]['id'] === parseInt(collectionId));
		if (collections[i]['id'] === parseInt(collectionId)) {
			current_collection = collections[i];
			break;
		}
	}
	// console.log(current_collection);

	function download(filename, file) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(file));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	const exportCollection = async () => {
		// download in csv
		const res = await fetch(`/api/collections/${collectionId}/download/`, {
			method: 'POST',
			// body: JSON.stringify(collectionId),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await res.text();
		// console.log(data);
		download('export.csv', data);
	};

	const importToTheCollection = async () => {
		const formData = new FormData();
		formData.append('fileToImport', fileToImport);

		// console.log(formData);
		// console.log(fileToImport);
		const res = await fetch(`/api/collections/${collectionId}/import/`, {
			method: 'POST',
			body: formData,
		});

		const data = await res.json();
		dispatch(getCollections());
	};

	const deleteCoinHandler = e => {
		e.preventDefault();
		// console.log(e.target.id);
		dispatch(removeCoin(e.target.id));
		dispatch(getCollections());
	};

	return (
		<>
			<NavBar />
			<div className="collection__content--container">
				<h1 className="collection-title">{current_collection?.name}</h1>
				<h3 className="collection__coins-count">Coins in collection: {current_collection?.coins_in.length}</h3>

				{/* File import */}
				<div className="collection__import-export--btns">
					<input
						type="file"
						id="importCsv"
						onChange={e => setFileToImport(e.target.files[0])}
						hidden
						accept="text/csv"
					/>
					<label htmlFor="importCsv" className="importCSV--label">
						{fileToImport?.name ? fileToImport?.name : 'File To Import'}
					</label>

					<button onClick={importToTheCollection} className="importCSV--btn">
						<i className="fas fa-upload"></i> Import to the database
					</button>

					<button onClick={exportCollection} className="exportInCSV--btn">
						<i className="fas fa-download"></i>Export in CSV
					</button>
				</div>
				<table className="collection__content--table">
					<thead>
						<tr>
							<th>#</th>
							<th>Reverse</th>
							<th>Obverse</th>
							<th>Name</th>
							<th>Country</th>
							<th>Composition</th>
							<th>Series</th>
							<th>Mintage</th>
							<th>Year</th>
							{/* <th>Value</th> */}
							<th>Diameter</th>
							<th>Thickness</th>
							<th>Weight</th>
							<th>Orientation</th>
							<th>Shape</th>
							{/* <th>Amount</th> */}
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{current_collection?.coins_in.map((coin, id) => {
							return (
								<tr key={coin.id}>
									<td>
										<NavLink to={`/coins/${coin.id}`}>{id + 1}</NavLink>
									</td>
									<td>
										<NavLink to={`/coins/${coin.id}`}>
											<img
												src={coin?.reverse_photo}
												className="collection__content--img"
												alt="reverse"
											></img>
										</NavLink>
									</td>
									<td>
										<NavLink to={`/coins/${coin.id}`}>
											<img
												src={coin?.obverse_photo}
												className="collection__content--img"
												alt="obverse"
											></img>
										</NavLink>
									</td>
									<td>
										<NavLink to={`/coins/${coin.id}`}>{coin?.name}</NavLink>
									</td>
									<td>{coin?.country}</td>
									<td>{coin?.composition}</td>
									<td>{coin?.series}</td>
									<td>{coin?.mintage}</td>
									<td>{coin?.year}</td>
									{/* <td>{coin?.value}</td> */}
									<td>{coin?.diameter}</td>
									<td>{coin?.thickness}</td>
									<td>{coin?.weight}</td>
									<td>{coin?.orientation}</td>
									<td>{coin?.shape}</td>
									{/* <td>
										<input
										type="number"
										value={coinsCount}
										className="collection__content--amount"
										onChange={e => setCoinsCount(e.target.value)}
										></input>
									</td> */}
									<td className="collection-content__delete_column">
										<button>
											<i
												className="far fa-trash-alt collection-content--delete-btn"
												id={coin?.id}
												onClick={deleteCoinHandler}
											></i>
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
