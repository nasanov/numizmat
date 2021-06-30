import React from 'react';
import './Footer.css';

export default function Footer() {
	return (
		<footer className="main-footer">
			<section className="footer-wrapper">
				<div className="about">
					<span className="footer-heading">About Developer</span>
					<div className="footer__blocks">
						<div className="footer__blocks--item">
							<h2 className="footer__subtitle">Contact info:</h2>
							<ul className="footer-list">
								<li className="footer-li">
									<a href="https://nasanov.github.io">Name: Nurs Asanov</a>
								</li>
								<li className="footer-li">
									E-mail: <a href="mailto:nurs.asanov@pm.me">nurs.asanov@pm.me</a>
								</li>
							</ul>
						</div>
						<div className="footer__blocks--item">
							<h2 className="footer__subtitle">Find me in:</h2>
							<ul className="footer-list">
								<li className="footer-li">
									<a href="https://github.com/nasanov">GitHub</a>
								</li>
								<li className="footer-li">
									<a href="https://www.linkedin.com/in/nursultan-asanov/">Linkedin</a>
								</li>
							</ul>
						</div>
						<div className="footer__blocks--item">
							<h2 className="footer__subtitle">Other projects:</h2>
							<div className="footer__blocks--item-ul">
								<ul className="footer-list">
									<li className="footer-li">
										<a href="https://numizmat.herokuapp.com/">Numizmat</a>
									</li>
									<li className="footer-li">
										<a href="https://zelp-app.herokuapp.com/">Zelp</a>
									</li>
								</ul>
								<ul>
									<li className="footer-li">
										<a href="https://woofwoof-app.herokuapp.com/">Woof Woof</a>
									</li>
									<li className="footer-li">
										<a href="https://good-movies-js.herokuapp.com/">Good-Movies</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</footer>
	);
}
