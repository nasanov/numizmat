import React from 'react';
import { useSelector } from 'react-redux';
import './SideBar.css';

function SideBar() {
	const user = useSelector(state => state.session.user);
	console.log(user);
	return (
		<>
			<div className="sidebar">
				<ul class="sidebar-filter">
					<li class="sidebar-filter__item">
						<div class="sidebar-filter__content">
							<ul class="categories">
								<li>
									<h3>Country</h3>
									<ul>
										<li class="sub">
											<label>Country 1</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Country 2</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Country 3</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Country 4</label>
											<input type="checkbox"></input>
										</li>
									</ul>
								</li>
								<li>
									<h3>Series</h3>
									<ul>
										<li class="sub">
											<label>Series 1</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Series 2</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Series 3</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Series 4</label>
											<input type="checkbox"></input>
										</li>
									</ul>
								</li>
								<li>
									<h3>Year</h3>
									<ul>
										<li class="sub">
											<label>Year 1</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Year 2</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
											<label>Year 3</label>
											<input type="checkbox"></input>
										</li>
										<li class="sub">
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

export default SideBar;
