import React, { useState } from 'react';
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
	// console.log('%%%%%%%%%%%%', coins);
	const dispatch = useDispatch();

	const arr = [];
	for (let i in categories) {
		arr.push(i);
	}

	// Search

	return (
		<>
			<div className="sidebar">
				<ul className="sidebar-filter">
					<li className="sidebar-filter__item">
						<div className="sidebar-filter__content">
							<AddCoinModal />
							<input
								type="search"
								placeholder="Search ..."
								onChange={e => {
									setSearchTerm(e.target.value);
								}}
							></input>
							<div>
								<span>Sort by country:</span>
								<select onChange={e => dispatch(filterCoinsByCountry(coins, e.target.value))}>
									<option value="">All Countries</option>
									<option value="Kyrgyzstan">Kyrgyzstan</option>
									<option value="United States">United States</option>
								</select>
							</div>
							<div>
								<span>Order by:</span>
								<select onChange={e => dispatch(sortCoinsByYear(filteredCoins, e.target.value))}>
									<option value="country">Country</option>
									<option value="name">Name</option>
									<option value="year">Year</option>
									<option value="mintage">Mintage</option>
									<option value="weight">Weight</option>
									<option value="country">Country</option>
								</select>
							</div>
							{/* Automaticly filter the content while typing */}
							<ul className="categories">
								{arr.map(category => {
									return (
										<li>
											<h3>{category}</h3>
											<ul>
												{categories[category].map(category_item => {
													return (
														<li className="sub">
															<label>{category_item}</label>
															<input type="checkbox"></input>
														</li>
													);
												})}
											</ul>
										</li>
									);
								})}
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</>
	);
}
