import React from 'react';
import './CoinBlock.css';
import { NavLink } from 'react-router-dom';
import AddToCollectionModal from '../Collection/AddToCollectionModal/AddToCollectionModal';

export default function CoinBlock({ coin }) {
	return (
		<div className="coin__container">
			<div>
				<div className="flip-card" tabIndex="0">
					<div className="flip-card-inner">
						<div className="flip-card-front">
							<NavLink to={`/coins/${coin.id}`}>
								<img src={coin.obverse_photo} alt={`${coin.name}`} className="coin_img"></img>
							</NavLink>
						</div>
						<div className="flip-card-back">
							<NavLink to={`/coins/${coin.id}`}>
								<img src={coin.reverse_photo} alt={`${coin.name}`} className="coin_img"></img>
							</NavLink>
						</div>
					</div>
				</div>
				{/* <NavLink to={`/coins/${coin.id}`}>
					<img src={coin.reverse_photo} alt={`${coin.name}`} className="coin_img"></img>
					<img src={coin['reverse_photo ']} alt={`${coin.name}`} className="coin_img"></img>
				</NavLink> */}
			</div>
			<div className="coin__title">
				<NavLink to={`/coins/${coin.id}`}>
					<span>{coin.name}</span>
				</NavLink>
			</div>
			{/* <div className="coin__additional-info">
				<span>{coin['value ']}</span>
			</div> */}
			<div className="coin__block--btn">
				{/* <button className="coin__add-to-collection--btn" onClick={addToWishlist}>Add to wishlist</button> */}
				{/* <button className="coin__add-to-collection--btn" onClick={addToCollection}>
					Add to collection
				</button> */}
				<AddToCollectionModal coin={coin} />
			</div>
		</div>
	);
}
