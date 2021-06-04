import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ############################################################### //
// ############################  CSS  ############################ //
// ############################################################### //
import './AddCoinForm.css';

// ################################################################## //
// ############################  STORES  ############################ //
// ################################################################## //

import { addNewCoin } from '../../../store/coins';

const AddCoinForm = ({ setShowModal }) => {
	// const history = useHistory();
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [obversePhoto, setObversePhoto] = useState('');
	const [reversePhoto, setReversePhoto] = useState('');
	const [country, setCountry] = useState('');
	const [isCollectible, setIsCollectible] = useState('');
	const [series, setSeries] = useState('');
	const [year, setYear] = useState('');
	const [mintage, setMintage] = useState('');
	const [value, setValue] = useState('');
	const [composition, setComposition] = useState('');
	const [weight, setWeight] = useState('');
	const [diameter, setDiameter] = useState('');
	const [thickness, setThickness] = useState('');
	const [shape, setShape] = useState('');
	const [orientation, setOrientation] = useState('');
	const [errors, setErrors] = useState('');

	const { user } = useSelector(state => state.session);

	if (!user) {
		return <Redirect to="/" />;
	}

	const handleSubmit = async e => {
		e.preventDefault();
		const coin_info = {
			name,
			obversePhoto,
			reversePhoto,
			country,
			isCollectible,
			series,
			year,
			mintage,
			value,
			composition,
			weight,
			diameter,
			thickness,
			shape,
			orientation,
		};

		let newCoin = await dispatch(addNewCoin(coin_info));

		if (newCoin.name) {
			setShowModal(false);
		} else {
			setErrors(newCoin.errors);
		}
	};

	return (
		<div className="coin-form__div">
			<form className="coin-form__main" onSubmit={handleSubmit}>
				<div className="coin-form__photo-outer-container">
					<div className="coin-form__photo-container">
						<div className="coin-form__photo-input">
							<input
								type="file"
								id="reverse-pic-btn"
								onChange={e => setReversePhoto(e.target.files[0])}
								hidden
							/>
							<label htmlFor="reverse-pic-btn" class="coin-form__photo-button">
								{reversePhoto?.name ? reversePhoto?.name : 'Reverse Photo'}
							</label>
						</div>

					</div>
					<div className="coin-form__photo-container">
						<div className="coin-form__photo-input">
							<input
								type="file"
								id="obverse-pic-btn"
								onChange={e => setObversePhoto(e.target.files[0])}
								hidden
							/>
							<label htmlFor="obverse-pic-btn" class="coin-form__photo-button">
								{obversePhoto?.name ? obversePhoto?.name : 'Obverse Photo'}
							</label>
						</div>
					</div>
				</div>
				{errors.length ? (
					<div className="errorsContainer">
						<span>The following errors occurred:</span>
						<ul className="errorsList">
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
					</div>
				) : (
					<div></div>
				)}
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="name"
						value={name}
						onChange={e => setName(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="country"
						value={country}
						onChange={e => setCountry(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="isCollectible"
						value={isCollectible}
						onChange={e => setIsCollectible(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="series"
						value={series}
						onChange={e => setSeries(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="year"
						value={year}
						onChange={e => setYear(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="mintage"
						value={mintage}
						onChange={e => setMintage(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="value"
						value={value}
						onChange={e => setValue(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="composition"
						value={composition}
						onChange={e => setComposition(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="weight"
						value={weight}
						onChange={e => setWeight(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="diameter"
						value={diameter}
						onChange={e => setDiameter(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="thickness"
						value={thickness}
						onChange={e => setThickness(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="shape"
						value={shape}
						onChange={e => setShape(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					<input
						className="coin-form__input"
						type="text"
						placeholder="orientation"
						value={orientation}
						onChange={e => setOrientation(e.target.value)}
					></input>
				</div>
				<button className="coin-form__button" type="submit">
					Add Coin
				</button>
			</form>
		</div>
	);
};

export default AddCoinForm;
