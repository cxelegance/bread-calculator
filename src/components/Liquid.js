import React, {useEffect, useContext} from 'react';
import numeral from 'numeral';

import {updateLiquid, removeIngredient} from '../actions/ingredients';
import {zeroOrNumber} from '../lib/calculators';
import BlurInput from './BlurInput';
import BreadMixesContext from '../context/bread-mixer-context';

/** @module */

/**
 * Responsible for rendering a Flour component.
 * @function
 *
 * @param {Object} p                     Params are wrapped in this object.
 * @param {Number} p.id                  ID for this ingredient.
 * @param {String} p.description         Description of this ingredient.
 * @param {Number} p.weight              Weight of this ingredient.
 * @param {Number} p.contributionLiquids This ingredient's contribution to weight of all Liquid ingredients in the entire bread.
 * @param {Number} p.contributionFlours  This ingredient's contribution to weight of all Flour ingredients in the entire bread.
 * @param {Number} p.contributionTotal   This ingredient's contribution to weight of the entire bread.
 *
 * @return {Object}
 */
const Liquid = (
	{
		id, description, weight, contributionLiquids, contributionFlours, contributionTotal
	}) => {
	const {dispatch} = useContext(BreadMixesContext);

	const formatWeight = weight => numeral(weight).format('0.0') + ' g';
	const formatPercent = val => numeral(val).format('0.0%');

	const handleNameChange = e => {
		e.preventDefault();
		const description = e.target.value;
		dispatch( updateLiquid( {id, description, weight} ) );
	};

	const handleWeightBlur = e => {
		const weight = zeroOrNumber(numeral(e.target.value).value());
		dispatch( updateLiquid({id, description, weight}) );
		return formatWeight(weight);
	};

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: Liquid`);
			return () => {
				console.log(`componentDidUnmount: Liquid`)
			}
		},
		[]
	);

	// componentDidUpdate: description, weight
	useEffect(
		() => {
			console.log(`componentDidUpdate: Liquid: description: ${description}; weight: ${weight}`);
		},
		[description, weight]
	);

	return (
		<div className="group-ingredient group-liquid">
			<div className="flex-container flex-container--space-between">
				<label className="flex-container--off-the-edge flex-container flex-container__label"><span className="flex-container__text">Name</span><input className="flex-container__input" type="text" value={description} onChange={handleNameChange} /></label>
				<button className="flex-container--off-the-edge flex-container__button button" onClick={ () => dispatch( removeIngredient(id) ) }>Remove</button>
			</div>
			<div className="flex-container flex-container--space-around">
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-weight">Weight <BlurInput type="text" className="input-numeric" blurvalue={formatWeight(weight)} blurhandler={handleWeightBlur} /></label>
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-liquid">Liquid <input type="text" className="input-numeric" readOnly={true} value={formatPercent(contributionLiquids)} /></label>
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-flour">Flour <input type="text" className="input-numeric" readOnly={true} value={formatPercent(contributionFlours)} /></label>
				<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-dough">Dough <input type="text" className="input-numeric" readOnly={true} value={formatPercent(contributionTotal)} /></label>
			</div>
		</div>
	);
};

export { Liquid as default };