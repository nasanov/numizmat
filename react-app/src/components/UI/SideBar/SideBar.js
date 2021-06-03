import React from 'react';
import { useSelector } from 'react-redux';
import './SideBar.css';

export default function SideBar() {
	const user = useSelector(state => state.session.user);
	// console.log(user);
	return (
		<>
			<div className="sidebar">
				<ul className="sidebar-filter">
					<li className="sidebar-filter__item">
						<div className="sidebar-filter__content">
							<ul className="categories">
								<li>
									<h3>Country</h3>
									<ul>
										<li className="sub">
											<label>Country 1</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Country 2</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Country 3</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Country 4</label>
											<input type="checkbox"></input>
										</li>
									</ul>
								</li>
								<li>
									<h3>Series</h3>
									<ul>
										<li className="sub">
											<label>Series 1</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Series 2</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Series 3</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Series 4</label>
											<input type="checkbox"></input>
										</li>
									</ul>
								</li>
								<li>
									<h3>Year</h3>
									<ul>
										<li className="sub">
											<label>Year 1</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Year 2</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Year 3</label>
											<input type="checkbox"></input>
										</li>
										<li className="sub">
											<label>Year 4</label>
											<input type="checkbox"></input>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</>
	);
}
