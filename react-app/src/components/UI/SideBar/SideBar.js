import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SideBar.css';
import AddCoinModal from './AddCoinModal.js';
import { filterCoinsByCountry } from '../../../store/filteredCoins';
import { sortCoinsByYear } from '../../../store/filteredCoins';

export default function SideBar({ setSearchTerm }) {
	// const user = useSelector(state => state.session.user);
	// console.log(user);

	const categories = useSelector(state => state.categories);
	const coins = useSelector(state => state.coins);
	const filteredCoins = useSelector(state => state.filteredCoins);

	const dispatch = useDispatch();

	const arr = [];
	for (let i in categories) {
		arr.push(i);
	}

	let coins_arr = [];
	if (filteredCoins['items']) {
		coins_arr = filteredCoins['items'];
	} else {
		for (let i in coins) {
			coins_arr.push(coins[i]);
		}
	}

	const handleOrderBy = e => {
		e.preventDefault();
		dispatch(sortCoinsByYear(coins_arr, e.target.value));
	};
	// console.log(categories.country);
	return (
		<>
			<div className="sidebar">
				<ul className="sidebar-filter">
					<li className="sidebar-filter__item">
						<div className="sidebar-filter__content">
							<AddCoinModal />
							<p>Search by Name:</p>
							<input
								type="search"
								placeholder="Search by name ..."
								className="sidebar__search"
								onChange={e => {
									setSearchTerm(e.target.value);
								}}
							></input>
							<div>
								<p>Sort by country:</p>
								<select onChange={e => dispatch(filterCoinsByCountry(coins, e.target.value))}>
									<option value="">All Countries</option>
									{categories?.country?.map(country => {
										if (country !== '') return <option value={country}>{country}</option>;
										else return null;
									})}
								</select>
							</div>
							<div>
								<p>Order by:</p>
								<select onChange={handleOrderBy}>
									<option value="country">Country</option>
									<option value="name">Name</option>
									<option value="year">Year</option>
									<option value="mintage">Mintage</option>
									<option value="weight">Weight</option>
									<option value="country">Country</option>
									<option value="created_at">Date</option>
								</select>
							</div>
						</div>
					</li>
					{/* <h3>Coins found: {coins_arr.length}</h3> */}
					<li className="sidebar-filter__item">
						<ul className="categories">
							{/* {arr.map(category => {
								return (
									<li key={category.id}>
										<h3>{category}</h3>
										<ul>
											{categories[category]?.map(category_item => {
												return (
													<li className="sub" key={category_item?.id}>
														<label>{category_item}</label>
														<input type="checkbox"></input>
													</li>
												);
											})}
										</ul>
									</li>
								);
							})} */}
						</ul>
					</li>
				</ul>
			</div>
		</>
	);
}
