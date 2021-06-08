import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ############################################################### //
// ############################  CSS  ############################ //
// ############################################################### //

import './EditCoinForm.css';
import Arrow from '../../../../images/sort-down-solid.svg';

// ################################################################## //
// ############################  STORES  ############################ //
// ################################################################## //

import { modifyCoin } from '../../../../store/coins';

export default function EditCoinForm({ setShowModal, coin }) {
	// const history = useHistory();
	const dispatch = useDispatch();

	const [name, setName] = useState(coin.name);
	const [obversePhoto, setObversePhoto] = useState(coin.obverse_photo);
	const [reversePhoto, setReversePhoto] = useState(coin.reverse_photo);
	const [country, setCountry] = useState(coin.country);
	const [isCollectible, setIsCollectible] = useState(coin.is_collectibe);
	const [series, setSeries] = useState(coin.series);
	const [year, setYear] = useState(coin.year);
	const [mintage, setMintage] = useState(coin.mintage);
	const [value, setValue] = useState(coin.value);
	const [composition, setComposition] = useState(coin.composition);
	const [weight, setWeight] = useState(coin.weight);
	const [diameter, setDiameter] = useState(coin.diameter);
	const [thickness, setThickness] = useState(coin.thickness);
	const [shape, setShape] = useState(coin.shape);
	const [orientation, setOrientation] = useState(coin.orientation);
	const [errors, setErrors] = useState([]);

	const { user } = useSelector(state => state.session);

	if (!user) {
		return <Redirect to="/login" />;
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
			weight: weight === '' ? 0 : weight,
			diameter: diameter === '' ? 0 : diameter,
			thickness: thickness === '' ? 0 : thickness,
			shape,
			orientation,
		};

		let editedCoin = await dispatch(modifyCoin(coin.id, coin_info));

		if (editedCoin.name) {
			setShowModal(false);
		} else {
			setErrors(editedCoin.errors);
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
								accept="image/png, image/jpeg"
							/>
							<label htmlFor="reverse-pic-btn" className="coin-form__photo-button">
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
								accept="image/png, image/jpeg"
							/>
							<label htmlFor="obverse-pic-btn" className="coin-form__photo-button">
								{obversePhoto?.name ? obversePhoto?.name : 'Obverse Photo'}
							</label>
						</div>
					</div>
				</div>
				{errors.length ? (
					<div className="errorsContainer">
						<span>The following errors occurred:</span>
						<ul className="errorsList">
							{errors?.map((error, idx) => (
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
						required
						onChange={e => setName(e.target.value)}
					></input>
				</div>
				<div className="coin-form__div">
					{/* <input
						className="coin-form__input"
						type="text"
						placeholder="country"
						value={country}
						onChange={e => setCountry(e.target.value)}
					></input> */}
					<div>
						<input
							className="coin-form__input"
							type="text"
							placeholder="country"
							value={country}
							onChange={e => setCountry(e.target.value)}
							list="countries"
							// style="background:url('images/arrow_down.png') no-repeat right center"
						/>
						<img src={Arrow} className="arrow-down"></img>
					</div>

					<datalist id="countries">
						<option value="Afganistan">Afghanistan</option>
						<option value="Albania">Albania</option>
						<option value="Algeria">Algeria</option>
						<option value="American Samoa">American Samoa</option>
						<option value="Andorra">Andorra</option>
						<option value="Angola">Angola</option>
						<option value="Argentina">Argentina</option>
						<option value="Armenia">Armenia</option>
						<option value="Aruba">Aruba</option>
						<option value="Australia">Australia</option>
						<option value="Austria">Austria</option>
						<option value="Azerbaijan">Azerbaijan</option>
						<option value="Bahamas">Bahamas</option>
						<option value="Bahrain">Bahrain</option>
						<option value="Bangladesh">Bangladesh</option>
						<option value="Barbados">Barbados</option>
						<option value="Belarus">Belarus</option>
						<option value="Belgium">Belgium</option>
						<option value="Belize">Belize</option>
						<option value="Benin">Benin</option>
						<option value="Bermuda">Bermuda</option>
						<option value="Bhutan">Bhutan</option>
						<option value="Bolivia">Bolivia</option>
						<option value="Bonaire">Bonaire</option>
						<option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
						<option value="Botswana">Botswana</option>
						<option value="Brazil">Brazil</option>
						<option value="Brunei">Brunei</option>
						<option value="Bulgaria">Bulgaria</option>
						<option value="Burundi">Burundi</option>
						<option value="Cambodia">Cambodia</option>
						<option value="Cameroon">Cameroon</option>
						<option value="Canada">Canada</option>
						<option value="Canary Islands">Canary Islands</option>
						<option value="Cayman Islands">Cayman Islands</option>
						<option value="Central African Republic">Central African Republic</option>
						<option value="Chad">Chad</option>
						<option value="Channel Islands">Channel Islands</option>
						<option value="Chile">Chile</option>
						<option value="China">China</option>
						<option value="Christmas Island">Christmas Island</option>
						<option value="Cocos Island">Cocos Island</option>
						<option value="Colombia">Colombia</option>
						<option value="Comoros">Comoros</option>
						<option value="Congo">Congo</option>
						<option value="Cook Islands">Cook Islands</option>
						<option value="Costa Rica">Costa Rica</option>
						<option value="Cote DIvoire">Cote DIvoire</option>
						<option value="Croatia">Croatia</option>
						<option value="Cuba">Cuba</option>
						<option value="Curaco">Curacao</option>
						<option value="Cyprus">Cyprus</option>
						<option value="Czech Republic">Czech Republic</option>
						<option value="Denmark">Denmark</option>
						<option value="Djibouti">Djibouti</option>
						<option value="Dominica">Dominica</option>
						<option value="Dominican Republic">Dominican Republic</option>
						<option value="East Timor">East Timor</option>
						<option value="Ecuador">Ecuador</option>
						<option value="Egypt">Egypt</option>
						<option value="Equatorial Guinea">Equatorial Guinea</option>
						<option value="Eritrea">Eritrea</option>
						<option value="Estonia">Estonia</option>
						<option value="Ethiopia">Ethiopia</option>
						<option value="Falkland Islands">Falkland Islands</option>
						<option value="Fiji">Fiji</option>
						<option value="Finland">Finland</option>
						<option value="France">France</option>
						<option value="Gabon">Gabon</option>
						<option value="Gambia">Gambia</option>
						<option value="Georgia">Georgia</option>
						<option value="Germany">Germany</option>
						<option value="Ghana">Ghana</option>
						<option value="Gibraltar">Gibraltar</option>
						<option value="Great Britain">Great Britain</option>
						<option value="Greece">Greece</option>
						<option value="Greenland">Greenland</option>
						<option value="Grenada">Grenada</option>
						<option value="Guadeloupe">Guadeloupe</option>
						<option value="Guam">Guam</option>
						<option value="Guatemala">Guatemala</option>
						<option value="Guinea">Guinea</option>
						<option value="Guyana">Guyana</option>
						<option value="Haiti">Haiti</option>
						<option value="Hawaii">Hawaii</option>
						<option value="Honduras">Honduras</option>
						<option value="Hong Kong">Hong Kong</option>
						<option value="Hungary">Hungary</option>
						<option value="Iceland">Iceland</option>
						<option value="Indonesia">Indonesia</option>
						<option value="India">India</option>
						<option value="Iran">Iran</option>
						<option value="Iraq">Iraq</option>
						<option value="Ireland">Ireland</option>
						<option value="Israel">Israel</option>
						<option value="Italy">Italy</option>
						<option value="Jamaica">Jamaica</option>
						<option value="Japan">Japan</option>
						<option value="Jordan">Jordan</option>
						<option value="Kazakhstan">Kazakhstan</option>
						<option value="Kenya">Kenya</option>
						<option value="Kiribati">Kiribati</option>
						<option value="Korea North">Korea North</option>
						<option value="Korea Sout">Korea South</option>
						<option value="Kuwait">Kuwait</option>
						<option value="Kyrgyzstan">Kyrgyzstan</option>
						<option value="Laos">Laos</option>
						<option value="Latvia">Latvia</option>
						<option value="Lebanon">Lebanon</option>
						<option value="Lesotho">Lesotho</option>
						<option value="Liberia">Liberia</option>
						<option value="Lithuania">Lithuania</option>
						<option value="Luxembourg">Luxembourg</option>
						<option value="Macau">Macau</option>
						<option value="Macedonia">Macedonia</option>
						<option value="Madagascar">Madagascar</option>
						<option value="Malaysia">Malaysia</option>
						<option value="Malawi">Malawi</option>
						<option value="Maldives">Maldives</option>
						<option value="Mali">Mali</option>
						<option value="Malta">Malta</option>
						<option value="Martinique">Martinique</option>
						<option value="Mauritania">Mauritania</option>
						<option value="Mauritius">Mauritius</option>
						<option value="Mayotte">Mayotte</option>
						<option value="Mexico">Mexico</option>
						<option value="Midway Islands">Midway Islands</option>
						<option value="Moldova">Moldova</option>
						<option value="Monaco">Monaco</option>
						<option value="Mongolia">Mongolia</option>
						<option value="Montserrat">Montserrat</option>
						<option value="Morocco">Morocco</option>
						<option value="Mozambique">Mozambique</option>
						<option value="Myanmar">Myanmar</option>
						<option value="Nambia">Nambia</option>
						<option value="Nauru">Nauru</option>
						<option value="Nepal">Nepal</option>
						<option value="Netherlands">Netherlands (Holland)</option>
						<option value="Nevis">Nevis</option>
						<option value="New Caledonia">New Caledonia</option>
						<option value="New Zealand">New Zealand</option>
						<option value="Nicaragua">Nicaragua</option>
						<option value="Niger">Niger</option>
						<option value="Nigeria">Nigeria</option>
						<option value="Niue">Niue</option>
						<option value="Norfolk Island">Norfolk Island</option>
						<option value="Norway">Norway</option>
						<option value="Oman">Oman</option>
						<option value="Pakistan">Pakistan</option>
						<option value="Palau Island">Palau Island</option>
						<option value="Palestine">Palestine</option>
						<option value="Panama">Panama</option>
						<option value="Papua New Guinea">Papua New Guinea</option>
						<option value="Paraguay">Paraguay</option>
						<option value="Peru">Peru</option>
						<option value="Phillipines">Philippines</option>
						<option value="Pitcairn Island">Pitcairn Island</option>
						<option value="Poland">Poland</option>
						<option value="Portugal">Portugal</option>
						<option value="Puerto Rico">Puerto Rico</option>
						<option value="Qatar">Qatar</option>
						<option value="Republic of Serbia">Republic of Serbia</option>
						<option value="Reunion">Reunion</option>
						<option value="Romania">Romania</option>
						<option value="Russia">Russia</option>
						<option value="St Kitts-Nevis">St Kitts-Nevis</option>
						<option value="St Lucia">St Lucia</option>
						<option value="Saipan">Saipan</option>
						<option value="Samoa">Samoa</option>
						<option value="Samoa American">Samoa American</option>
						<option value="San Marino">San Marino</option>
						<option value="Saudi Arabia">Saudi Arabia</option>
						<option value="Senegal">Senegal</option>
						<option value="Seychelles">Seychelles</option>
						<option value="Sierra Leone">Sierra Leone</option>
						<option value="Singapore">Singapore</option>
						<option value="Slovakia">Slovakia</option>
						<option value="Slovenia">Slovenia</option>
						<option value="Solomon Islands">Solomon Islands</option>
						<option value="Somalia">Somalia</option>
						<option value="South Africa">South Africa</option>
						<option value="Spain">Spain</option>
						<option value="Sri Lanka">Sri Lanka</option>
						<option value="Sudan">Sudan</option>
						<option value="Swaziland">Swaziland</option>
						<option value="Sweden">Sweden</option>
						<option value="Switzerland">Switzerland</option>
						<option value="Taiwan">Taiwan</option>
						<option value="Tajikistan">Tajikistan</option>
						<option value="Tanzania">Tanzania</option>
						<option value="Thailand">Thailand</option>
						<option value="Togo">Togo</option>
						<option value="Turkey">Turkey</option>
						<option value="Turkmenistan">Turkmenistan</option>
						<option value="Tuvalu">Tuvalu</option>
						<option value="Uganda">Uganda</option>
						<option value="United Kingdom">United Kingdom</option>
						<option value="Ukraine">Ukraine</option>
						<option value="United Arab Erimates">United Arab Emirates</option>
						<option value="United States of America">United States of America</option>
						<option value="Uraguay">Uruguay</option>
						<option value="Uzbekistan">Uzbekistan</option>
						<option value="Vatican City State">Vatican City State</option>
						<option value="Venezuela">Venezuela</option>
						<option value="Vietnam">Vietnam</option>
						<option value="Yemen">Yemen</option>
						<option value="Zambia">Zambia</option>
						<option value="Zimbabwe">Zimbabwe</option>
					</datalist>
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
					<div>
						<input
							className="coin-form__input"
							type="text"
							placeholder="composition"
							value={composition}
							list="compositions"
							onChange={e => setComposition(e.target.value)}
						></input>
						<img src={Arrow} className="arrow-down"></img>
					</div>
					<datalist id="compositions">
						<option value="Silver">Silver (.925)</option>
						<option value="Silver">Silver (.999)</option>
						<option value="Gold">Gold (.999)</option>
						<option value="Copper Plated Zinc">Copper Plated Zinc</option>
						<option value="Copper-Nickel">Copper-Nickel</option>
						<option value="Manganese-Brass">Manganese-Brass</option>
					</datalist>
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
					<div>
						<input
							className="coin-form__input"
							type="text"
							placeholder="shape"
							value={shape}
							list="shapes"
							onChange={e => setShape(e.target.value)}
						></input>
						<img src={Arrow} className="arrow-down"></img>
					</div>
					<datalist id="shapes">
						<option value="Round">Round</option>
						<option value="Triangular">Triangular</option>
						<option value="Square/diamond">Square/diamond</option>
						<option value="Pentagonal">Pentagonal</option>
						<option value="Hexagonal">Hexagonal</option>
						<option value="Heptagonal">Heptagonal</option>
						<option value="Holed">Holed</option>
					</datalist>
				</div>
				<div className="coin-form__div">
					<div>
						<input
							className="coin-form__input"
							type="text"
							placeholder="orientation"
							value={orientation}
							list="orientations"
							onChange={e => setOrientation(e.target.value)}
						></input>
						<img src={Arrow} className="arrow-down"></img>
					</div>
					<datalist id="orientations">
						<option value="Medallic Orientation">Medallic Orientation</option>
						<option value="Coin Orientation">Coin Orientation</option>
					</datalist>
				</div>
				<button className="coin-form__button" type="submit">
					Edit Coin
				</button>
			</form>
		</div>
	);
}
