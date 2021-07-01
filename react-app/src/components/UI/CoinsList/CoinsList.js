import React, { useEffect } from 'react';
import CoinBlock from './CoinsBlock';
import './CoinsList.css';
import { useSelector, useDispatch } from 'react-redux';
import AddCoinModal from '../SideBar/AddCoinModal';
import { loadNewPage, loadExactPage } from '../../../store/pages';

export default function CoinsList({ searchTerm }) {
	const coins = useSelector(state => state.coins);
	const filteredCoins = useSelector(state => state.filteredCoins);
	let dispatch = useDispatch();
	let arr = [];
	if (filteredCoins['items']) {
		arr = filteredCoins['items'];
	} else {
		for (let i in coins) {
			arr.push(coins[i]);
		}
	}

	const nextPage = () => {
		dispatch(loadNewPage({ page: 1 }));
	};

	const previousPage = () => {
		dispatch(loadNewPage({ page: -1 }));
	};

	const goToPage = page => {
		dispatch(loadExactPage({ page }));
	};
	// useEffect(() => {}, [coins]);

	return (
		<div>
			{/* <span>{arr.length}: coins found</span> */}
			<div className="coins-list__container">
				{arr
					?.filter(coin => {
						if (searchTerm === '') {
							return coin;
						} else if (coin.name.toLowerCase().includes(searchTerm.toLowerCase())) {
							return coin;
						} else return null;
					})
					.reverse()
					.slice(0, 47)
					.map(coin => {
						return <CoinBlock coin={coin} key={coin.id} />;
					})}
				<div className="coin__container">
					<div>
						<i className="fas fa-plus add-coin_img"></i>
					</div>
					{/* <div className="coin__title">Add new coin</div> */}
					<AddCoinModal />
				</div>
			</div>
			<div className="pagination__container">
				<nav className="pagination" role="navigation" aria-label="pagination">
					<button
						className="button pagination-previous"
						onClick={() => {
							previousPage();
						}}
					>
						Previous
					</button>
					<button
						className="button pagination-next"
						onClick={() => {
							nextPage();
						}}
					>
						Next page
					</button>
					<ul className="pagination-list">
						{arr.slice(0, arr.length / 48).map((value, index) => (
							<button
								className="pagination-link"
								aria-label="Page 1"
								onClick={() => goToPage(index + 1)}
								aria-current="page"
							>
								{index + 1}
							</button>
						))}
					</ul>
				</nav>
			</div>
		</div>
	);
}
