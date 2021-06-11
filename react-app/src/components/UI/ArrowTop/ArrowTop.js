import React, { useState } from 'react';
import './ArrowTop.css';

export default function ArrowTop() {
	const [showScroll, setShowScroll] = useState(false);
	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	window.addEventListener('scroll', checkScrollTop);

	return (
		<>
			<div>
				<i
					className="fas fa-arrow-up scrollTop"
					onClick={scrollTop}
					style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
				></i>
			</div>
		</>
	);
}
