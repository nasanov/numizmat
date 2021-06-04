import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './SideBar.css';
import { Modal } from '../../../context/Modal';
import AddCoinModal from './AddCoinModal.js';

export default function SideBar() {
	// const user = useSelector(state => state.session.user);
	// console.log(user);

	const categories = useSelector(state => state.categories);

	const arr = [];
	for (let i in categories) {
		arr.push(i);
	}

	// console.log(categories);
	// console.log(arr);

	return (
		<>
			<div className="sidebar">
				<ul className="sidebar-filter">
					<li className="sidebar-filter__item">
						<div className="sidebar-filter__content">
							<AddCoinModal />
							<input type="search" placeholder="search"></input>
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
