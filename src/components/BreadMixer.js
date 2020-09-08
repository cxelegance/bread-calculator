import React, {useRef, useEffect, useContext, useState} from 'react';
import numeral from 'numeral';

import {
	addMixture, addFlour, addLiquid, updateJSON, getMixtures, getFlours, getLiquids, getSalts
} from '../actions/ingredients';
import ingredientsReducer from '../reducers/ingredients';
import {stateToBread, breadToTotals} from '../transformers/bread';
import {zeroOrNumber} from '../lib/calculators';
import BlurInput from './BlurInput';
import BreadMixesContext from '../context/bread-mixer-context';
import MixturesList from '../components/MixturesList';
import FlourList from '../components/FlourList';
import LiquidList from '../components/LiquidList';
import SaltList from '../components/SaltList';

/** @module */

/**
 * Responsible for rendering a BreadMixer component; it relies on the Bread library, which knows
 * how to calculate hydration and weight changes.
 * @function
 *
 * @see Bread
 *
 * @return {Object}
 */
const BreadMixer = () => {
	const formatWeight = weight => numeral(weight).format('0.0') + ' g';
	const formatPercent = val => numeral(val).format('0.0%');
	const {ingredients, dispatch} = useContext(BreadMixesContext);
	const mixtures = ingredientsReducer(ingredients, getMixtures());
	const flours = ingredientsReducer(ingredients, getFlours());
	const liquids = ingredientsReducer(ingredients, getLiquids());
	const salt = ingredientsReducer(ingredients, getSalts());
	const jsonRecipe = JSON.stringify(ingredients);
	const {total, totalFlour, totalLiquid, hydration} = breadToTotals(stateToBread(ingredients));

	const handleAddMixture = () => {
		const description = `Mixture ${mixtures.length + 1}`;
		const flour = {description: 'some flour', weight: 1};
		const liquid = {description: 'some liquid', weight: 1};
		const mixture = {description, flour, liquid};
		dispatch( addMixture(mixture) );
	};

	const handleAddFlour = () => {
		const description = `Flour ${flours.length + 1}`;
		const weight = 1;
		const flour = {description, weight};
		dispatch( addFlour(flour) );
	};

	const handleAddLiquid = () => {
		const description = `Liquid ${liquids.length + 1}`;
		const weight = 1;
		const liquid = {description, weight};
		dispatch( addLiquid(liquid) );
	};

	const handleChangeJSONRecipe = e => {
		let newState, newStateString, bread;
		try{
			newState = JSON.parse(e.target.value);
			bread = stateToBread(newState);
			newStateString = JSON.stringify(bread.getIngredientsValueOf());
		}catch(e){
			console.log(`handleChangeJSONRecipe() error: ${e}`);
			return;
		}
		dispatch( updateJSON(newStateString) );
	};

	const handleHydrationBlur = e => {
		const numeralHyd = numeral(e.target.value + '%');
		const newHydration = zeroOrNumber(numeralHyd.value()) || hydration;
		if(newHydration !== hydration){
			const bread = stateToBread(ingredients);
			try{
				bread.setHydration(newHydration);
			}catch(e){
				console.log(`handleHydrationBlur() error: ${e}`);
				return formatPercent(hydration);
			}
			const strIngredients = JSON.stringify(
				bread.getIngredientsValueOf()
			);
			dispatch( updateJSON(strIngredients) );
		}
		return formatPercent(newHydration);
	}

	const handleTotalBlur = e => {
		const numeralTotal = numeral(e.target.value);
		const newTotal = zeroOrNumber(numeralTotal.value()) || total;
		if(newTotal !== total){
			const bread = stateToBread(ingredients);
			try{
				bread.setWeight(newTotal);
			}catch(e){
				console.log(`handleTotalBlur() error: ${e}`);
				return formatWeight(total);
			}
			const strIngredients = JSON.stringify(
				bread.getIngredientsValueOf()
			);
			dispatch( updateJSON(strIngredients) );
		}
		return formatWeight(newTotal);
	}

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: BreadMixer`);
			return () => {
				console.log(`componentDidUnmount: BreadMixer`)
			}
		},
		[]
	);

	// componentDidUpdate: ingredients
	useEffect(
		() => {
			console.log(`componentDidUpdate: BreadMixer ingredients: total: ${total}; totalLiquid: ${totalLiquid}; totalFlour: ${totalFlour}`);
		},
		[ingredients]
	);

	return (
		<div className="">
			<div className="">
				<h3 className="page-header">Totals</h3>
			</div>
			<div className="flex-container flex-container--space-around">
				<label className="flex-container__circle-item flex-container__circle-item--bg-color-liquid"><span>Liquid</span> <input className="input-numeric" type="text" readOnly={true} value={formatWeight(totalLiquid)} /></label>
				<label className="flex-container__circle-item flex-container__circle-item--bg-color-hydration">Hydration<BlurInput className="input-numeric" type="text" blurvalue={formatPercent(hydration)} blurhandler={handleHydrationBlur} /></label>
				<label className="flex-container__circle-item flex-container__circle-item--bg-color-flour">Flour<input className="input-numeric" type="text" readOnly={true} value={formatWeight(totalFlour)} /></label>
				<label className="flex-container__circle-item flex-container__circle-item--bg-color-dough">Dough<BlurInput className="input-numeric" type="text" blurvalue={formatWeight(total)} blurhandler={handleTotalBlur} /></label>
			</div>
			<h3 className="page-header">Ingredients</h3>
			<h4 className="page-header">Mixtures (e.g., starter)</h4>
			<MixturesList />
			<button className=" button" onClick={ () => handleAddMixture() }>Add mixture</button>
			<h4 className="page-header">Flours (e.g., white, rye)</h4>
			<FlourList />
			<button className=" button" onClick={ () => handleAddFlour() }>Add flour</button>
			<h4 className="page-header">Liquids (e.g., water, milk)</h4>
			<LiquidList />
			<button className=" button" onClick={ () => handleAddLiquid() }>Add liquid</button>
			<h4 className="page-header">Salt</h4>
			<SaltList />
			<h3 className="page-header">JSON storage (copy & save in a note)</h3>
			<div className="">
				<textarea className="textarea-get-recipe" value={jsonRecipe} onChange={handleChangeJSONRecipe} />
			</div>
		</div>
	);
};

export { BreadMixer as default };