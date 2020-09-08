import React, {useEffect, useContext} from 'react';
import numeral from 'numeral';

import {updateSalt} from '../actions/ingredients';
import {zeroOrNumber} from '../lib/calculators';
import BlurInput from './BlurInput';
import BreadMixesContext from '../context/bread-mixer-context';

/** @module */

/**
 * Responsible for rendering a Salt component.
 * @function
 *
 * @param {Object} p                     Params are wrapped in this object.
 * @param {Number} p.id                  ID for this ingredient.
 * @param {String} p.description         Description of this ingredient.
 * @param {Number} p.weight              Weight of this ingredient.
 * @param {Number} p.contributionTotal   This ingredient's contribution to weight of the entire bread.
 * @param {Number} p.contributionFlours  This ingredient's contribution to weight of all Flour ingredients in the entire bread.
 *
 * @return {Object}
 */
const Salt = ({id, weight, contributionTotal, contributionFlours}) => {
	const {dispatch} = useContext(BreadMixesContext);

	const formatWeight = weight => numeral(weight).format('0.0') + ' g';
	const formatPercent = val => numeral(val).format('0.0%');

	const handleWeightBlur = e => {
		const weight = zeroOrNumber(numeral(e.target.value).value());
		const description = '';
		dispatch( updateSalt({id, description, weight}) );
		return formatWeight(weight);
	};

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: Salt: weight ${weight}`);
			return () => {
				console.log(`componentDidUnmount: Salt`)
			}
		},
		[]
	);

	// componentDidUpdate: weight
	useEffect(
		() => {
			console.log(`componentDidUpdate: Salt: weight: ${weight}`);
		},
		[weight]
	);

	return (
		<div className="group-ingredient group-salt flex-container flex-container--space-around">
			<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-weight">Weight <BlurInput type="text" className="input-numeric" blurvalue={formatWeight(weight)} blurhandler={handleWeightBlur} /></label>
			<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-liquid">Liquid <input type="text" className="input-numeric" value="n/a" readOnly={true} /></label>
			<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-flour">Flour<input type="text" className="input-numeric" readOnly={true} value={formatPercent(contributionFlours)} /></label>
			<label className="flex-container__rectangle-item flex-container__rectangle-item--bg-color-dough">Dough<input type="text" className="input-numeric" readOnly={true} value={formatPercent(contributionTotal)} /></label>
		</div>
	);
};

export { Salt as default };