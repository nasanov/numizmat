import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../../../context/Search';
import { useHistory } from 'react-router-dom';
import './Search.css';
// import ProfilePhoto from '../UserProfile/ProfilePhoto';

export default function Search() {
	const { searchParam, setSearchParam, matchingValues, setMatchingValues } = useSearch();
	let history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		// setSearchParam('');
		// setMatchingValues([]);
		// if (e.target.className.includes('coin_ele')) {
		// 	history.push(`/coins/${e.target.id}`);
		// } else {
		// 	history.push(`/collections/${e.target.id}`);
		// }
	};

	useEffect(() => {
		const fetchCoinsAndCollections = async () => {
			// console.log(searchParam);
			const res = await fetch('/api/search/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchParam }),
			});
			const data = await res.json();
			setMatchingValues(data.values);
		};

		if (searchParam.length > 0) fetchCoinsAndCollections();
		else {
			setMatchingValues([]);
		}
	}, [searchParam]);

	return (
		<form className="nav-searchBar-form" onSubmit={handleSubmit}>
			<input
				className="nav-searchBar"
				type="text"
				value={searchParam}
				placeholder="Search"
				onChange={e => setSearchParam(e.target.value)}
			></input>
			{matchingValues.length > 0 && (
				<ul className="search-container">
					{matchingValues.map((ele, index) => {
						return (
							<Link
								key={index}
								onClick={e => setSearchParam('')}
								id={ele.id}
								className={ele.year ? 'coin_ele' : 'collection_ele'}
								type="submit"
								to={ele.year ? `/coins/${ele.id}` : `/collections/${ele.id}`}
							>
								{ele.year ? (
									<div className="search__result--item">
										<div className="search__photo--container">
											<img src={ele.obverse_photo} style={{ marginRight: '10px;' }}></img>
											<img src={ele.reverse_photo}></img>
										</div>
										<div className="search__coin-info">
											<span id={ele.id} className={'search__coin-title'}>
												{`${ele.name}`}
											</span>
											<span className="search__secondary-info">Year: {ele.year}</span>
											<span className="search__secondary-info">Country: {ele.country}</span>
										</div>
									</div>
								) : (
									<div className="search__result--item">
										<span id={ele.id} className="search__collection-title">
											{`${ele.name}`}
										</span>
										<p className="search__secondary-collection--info">
											Coins in collection: {`${ele.coins_in?.length}`}
										</p>
									</div>
								)}
							</Link>
						);
					})}
				</ul>
			)}
		</form>
	);
}
