import React, {useEffect, useContext, useState} from 'react';
import numeral from 'numeral';

import {updateMixture, removeIngredient, getIngredient} from '../actions/ingredients';
import ingredientsReducer from '../reducers/ingredients';
import {zeroOrNumber} from '../lib/calculators';
import {breadToLiquids, breadToFlours, stateToBread} from '../transformers/bread';
import BlurInput from './BlurInput';
import BreadMixesContext from '../context/bread-mixer-context';

/** @module */

/**
 * Responsible for rendering a FlourWaterMixture component.
 * @function
 *
 * @param {Object} p                           Params are wrapped in this object.
 * @param {Number} p.id                        ID for this ingredient.
 * @param {String} p.description               Description of this mixture.
 * @param {Number} p.weight                    Calculated weight of this mixture.
 * @param {Number} p.hydration                 Calculated hydration of this mixture.
 * @param {String} p.flourDesc                 Description of the Flour ingredient in this mixture.
 * @param {Number} p.flourWeight               Weight of the Flour ingredient in this mixture.
 * @param {String} p.liquidDesc                Description of the Liquid ingredient in this mixture.
 * @param {Number} p.liquidWeight              Weight of the Liquid ingredient in this mixture.
 * @param {Number} p.flourContributionFlours   This mixture's flour contribution to the weight of all Flour ingredients in the entire bread.
 * @param {Number} p.liquidContributionLiquids This mixture's liquid contribution to the weight of all Liquid ingredients in the entire bread.
 * @param {Number} p.mixtureContributionTotal  This mixture's contribution to the weight of the entire bread.
 * @param {Number} p.mixturePercentageFlours   This mixture's contribution to the weight of all Flour ingredients in the entire bread.
 *
 * @return {Object}
 */
const FlourWaterMixture = (
	{
		id, description, hydration, weight,
		flourDesc, flourWeight, liquidDesc, liquidWeight,
		flourContributionFlours, liquidContributionLiquids,
		mixtureContributionTotal, mixturePercentageFlours
	}
) => {
	const formatWeight = weight => numeral(weight).format('0.0') + ' g';
	const formatPercent = val => numeral(val).format('0.0%');
	const {ingredients, dispatch} = useContext(BreadMixesContext);

	const dispatchMixture = ({description, flourDesc, flourWeight, liquidDesc, liquidWeight}) => {
		const flour = {description: flourDesc, weight: flourWeight};
		const liquid = {description: liquidDesc, weight: liquidWeight};
		dispatch(
			updateMixture( {id, description, flour, liquid} )
		);
	};

	const handleDescChange = (e) => {
		e.preventDefault();
		const description = e.target.value;
		dispatchMixture({description, flourDesc, flourWeight, liquidDesc, liquidWeight});
	};

	const handleFlourDescChange = e => {
		const flourDesc = e.target.value;
		dispatchMixture({description, flourDesc, flourWeight, liquidDesc, liquidWeight});
	};

	const handleLiquidDescChange = e => {
		const liquidDesc = e.target.value;
		dispatchMixture({description, flourDesc, flourWeight, liquidDesc, liquidWeight});
	};

	const handleFlourWeightBlur = e => {
		const weight = zeroOrNumber(numeral(e.target.value).value());
		dispatchFlourWeight(weight);
		return formatWeight(weight);
	};

	const dispatchFlourWeight = flourWeight => {
		dispatchMixture({description, flourDesc, flourWeight, liquidDesc, liquidWeight});
	};

	const handleLiquidWeightBlur = e => {
		const weight = zeroOrNumber(numeral(e.target.value).value());
		dispatchLiquidWeight(weight);
		return formatWeight(weight);
	};

	const dispatchLiquidWeight = liquidWeight => {
		dispatchMixture({description, flourDesc, flourWeight, liquidDesc, liquidWeight});
	};

	const handleHydrationBlur = e => {
		const numeralHyd = numeral(e.target.value + '%');
		const newHydration = zeroOrNumber(numeralHyd.value()) || hydration;
		if(newHydration !== hydration){
			let thisIngred = ingredientsReducer(ingredients, getIngredient(id))[0];
			const starter = stateToBread(thisIngred.data.ingredients);
			try{
				starter.setHydration(newHydration);
			}catch(e){
				console.log(e);
				return formatPercent(hydration);
			}
			const liquid = breadToLiquids(starter)[0].valueOf().data;
			const flour = breadToFlours(starter)[0].valueOf().data;
			console.log(liquid);
			dispatch( updateMixture({id, description, flour, liquid}) );
		}
		return formatPercent(newHydration);
	};

	const handleWeightBlur = e => {
		const numeralWeight = numeral(e.target.value);
		const newWeight = zeroOrNumber(numeralWeight.value()) || weight;
		if(newWeight !== weight){
			let thisIngred = ingredientsReducer(ingredients, getIngredient(id))[0];
			const starter = stateToBread(thisIngred.data.ingredients);
			try{
				starter.setWeight(newWeight);
			}catch(e){
				console.log(e);
				return formatWeight(weight);
			}
			const liquid = breadToLiquids(starter)[0].valueOf().data;
			const flour = breadToFlours(starter)[0].valueOf().data;
			dispatch( updateMixture({id, description, flour, liquid}) );
		}
		return formatWeight(newWeight);
	};

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: FlourWaterMixture`);
			return () => {
				console.log(`componentDidUnmount: FlourWaterMixture`)
			}
		},
		[]
	);

	// componentDidUpdate: description, flourDesc, liquidDesc
	useEffect(
		() => {
			console.log(
				`componentDidUpdate: FlourWaterMixture: ` +
				`description ${description}, flourDesc ${flourDesc}, ` +
				`liquidDesc ${liquidDesc}`
			);
		},
		[description, flourDesc, liquidDesc]
	);

	// componentDidUpdate: weight, flourWeight, liquidWeight, hydration
	useEffect(
		() => {
			console.log(
				`componentDidUpdate: FlourWaterMixture: weight ${weight}, flourWeight ${flourWeight}, liquidWeight ${liquidWeight}, hydration ${hydration}`
			);
		},
		[weight, flourWeight, liquidWeight, hydration]
	);

	// componentDidUpdate: ingredients
	useEffect(
		() => {
			console.log(
				`componentDidUpdate: FlourWaterMixture: ingredients updated`
			);
		},
		[ingredients]
	);

	return (
		<div className="group-ingredient group-mixture">
			<div className="flex-container flex-container--space-between">
				<label className="flex-container--off-the-edge flex-container flex-container__label"><span className="flex-container__text">Name</span><input className="flex-container__input" type="text" value={description} onChange={handleDescChange} /></label>
				<button className="flex-container--off-the-edge flex-container__button button" onClick={ () => dispatch( removeIngredient(id) ) }>Remove</button>
			</div>
			<div className="flex-container flex-container--space-around">
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-weight">Weight <BlurInput type="text" className="input-numeric" blurvalue={formatWeight(weight)} blurhandler={handleWeightBlur} /></label>
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-hydration">Hydration <BlurInput type="text" className="input-numeric" blurvalue={formatPercent(hydration)} blurhandler={handleHydrationBlur} /></label>
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-flour">Flour <input type="text" className="input-numeric" readOnly={true} value={formatPercent(mixturePercentageFlours)} /></label>
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-dough">Dough <input type="text" className="input-numeric" readOnly={true} value={formatPercent(mixtureContributionTotal)} /></label>
			</div>
			<div className="flex-container flex-container--space-around">
				<div className="flex-container__block-item group-flour">
					<h4 className="flex-container--off-the-edge page-header ">Flour</h4>
					<label className="flex-container--off-the-edge flex-container"><span className="flex-container__text">Name</span><input className="flex-container__input" type="text" value={flourDesc} onChange={handleFlourDescChange} /></label>
					<div className="flex-container flex-container--space-around">
						<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-weight">Weight <BlurInput type="text" className="input-numeric" blurvalue={formatWeight(flourWeight)} blurhandler={handleFlourWeightBlur} /></label>
						<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-flour">Flour <input type="text" className="input-numeric" readOnly={true} value={formatPercent(flourContributionFlours)} /></label>
					</div>
				</div>
				<div className="flex-container__block-item group-liquid">
					<h4 className="page-header flex-container--off-the-edge">Liquid</h4>
					<label className="flex-container--off-the-edge flex-container"><span className="flex-container__text">Name</span><input className="flex-container__input" type="text" value={liquidDesc} onChange={handleLiquidDescChange} /></label>
					<div className="flex-container flex-container--space-around">
						<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-weight">Weight <BlurInput type="text" className="input-numeric" blurvalue={formatWeight(liquidWeight)} blurhandler={handleLiquidWeightBlur} /></label>
						<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-liquid">Liquid <input type="text" className="input-numeric" readOnly={true} value={formatPercent(liquidContributionLiquids)} /></label>
					</div>
				</div>
			</div>
		</div>
	);
};

export { FlourWaterMixture as default };