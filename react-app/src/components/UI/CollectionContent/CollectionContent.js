import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './CollectionContent.css';

export default function CollectionContent() {
	const { collectionId } = useParams();
	// const collection = useSelector(state => state.collections[collectionId]);
	// console.log(collection);
	const collections = useSelector(state => state.collections);

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

	return (
		<>
			<NavBar />
			<div className="collection__content--container">
				<h1 className="collection-title">{current_collection?.name}</h1>
				<h3 className="">Coins in collection: {current_collection?.coins_in.length}</h3>
				<button onClick={exportCollection}>Export in CSV</button>
				<table className="collection__content--table">
					<tr>
						<th>#</th>
						<th>Obverse</th>
						<th>Reverse</th>
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
						<th>Amount</th>
						<th>Delete</th>
					</tr>

					{current_collection?.coins_in.map((coin, id) => {
						return (
							<>
								<tr key={coin.id}>
									<td>{id}</td>
									<td>
										<img
											src={coin?.obverse_photo}
											className="collection__content--img"
											alt="obverse"
										></img>
									</td>
									<td>
										<img
											src={coin?.reverse_photo}
											className="collection__content--img"
											alt="reverse"
										></img>
									</td>
									<td>{coin?.name}</td>
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
									<td>
										<input type="number" value="1" className="collection__content--amount"></input>
									</td>
								</tr>
							</>
						);
					})}
				</table>
			</div>
		</>
	);
}
