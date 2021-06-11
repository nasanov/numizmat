import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import './CoinDetail.css';

import NavBar from '../NavBar/NavBar';
import AddToCollectionModal from '../Collection/AddToCollectionModal/AddToCollectionModal';
import EditCoinModal from './EditCoinModal/EditCoinModal';
import { getCoins, removeCoin } from '../../../store/coins';
import { getCollections } from '../../../store/collections';

export default function CoinDetail() {
	const { coinId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getCoins());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCollections());
	}, [dispatch]);

	const coin = useSelector(state => state.coins[coinId]);
	const collections = useSelector(state => state.collections);
	const user = useSelector(state => state.session.user);

	let collections_array = [];
	for (let i in collections) {
		collections_array.push(collections[i]);
	}

	const deleteCoinHandler = () => {
		dispatch(removeCoin(coin.id));
		history.push('/home');
	};

	return (
		<>
			<NavBar />
			<div className="coin-detail__container">
				<h1 className="coin-info-title">{coin?.name}</h1>
				<div className="coin-info-photos">
					<img src={coin?.obverse_photo} alt={`${coin?.name}`} className="coin__detail--img"></img>
					<img src={coin?.reverse_photo} alt={`${coin?.name}`} className="coin__detail--img"></img>
				</div>
				<div className="coin-info-additional_info">
					<div className="coin-information">
						<div className="detail-entry">
							<span>name:</span>
							<span>{coin?.name}</span>
						</div>
						<div className="detail-entry">
							<span>country:</span>
							<span>{coin?.country}</span>
						</div>
						<div className="detail-entry">
							<span>is_collectible:</span>
							<span>{coin?.is_collectible ? 'True' : 'False'}</span>
						</div>
						<div className="detail-entry">
							<span>series:</span>
							<span>{coin?.series}</span>
						</div>
						<div className="detail-entry">
							<span>year:</span>
							<span>{coin?.year}</span>
						</div>
						<div className="detail-entry">
							<span>mintage:</span>
							<span>{coin?.mintage}</span>
						</div>
						<div className="detail-entry">
							<span>value:</span>
							<span>{coin?.value}</span>
						</div>
						<div className="detail-entry">
							<span>composition:</span>
							<span>{coin?.composition}</span>
						</div>
						<div className="detail-entry">
							<span>weight:</span>
							<span>{coin?.weight}</span>
						</div>
						<div className="detail-entry">
							<span>diameter:</span>
							<span>{coin?.diameter}</span>
						</div>
						<div className="detail-entry">
							<span>thickness:</span>
							<span>{coin?.thickness}</span>
						</div>
						<div className="detail-entry">
							<span>shape:</span>
							<span>{coin?.shape}</span>
						</div>
						<div className="detail-entry">
							<span>orientation:</span>
							<span>{coin?.orientation}</span>
						</div>
					</div>
				</div>
				{/* <button className="coin__add-to-collection--btn">Add to</button>
				<select>
					{collections_array.map(collection => {
						return <option>{collection?.name}</option>;
					})}
				</select> */}
				<AddToCollectionModal coin={coin} />
				{coin?.user_id === user.id ? (
					<div className="coin__edit-delete--btns">
						<EditCoinModal coin={coin} />
						{/* <button className="coin__add-to-collection--btn" onClick={editCoinHandler}>
							Edit coin
						</button> */}
						<button className="coin__add-to-collection--btn" onClick={deleteCoinHandler}>
							<i class="far fa-trash-alt delete__btn--trash"></i>Delete coin
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	);
}
