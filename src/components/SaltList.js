import React, {useEffect, useContext} from 'react';

import Salt from '../components/Salt';

import {getSalts} from '../actions/ingredients';
import ingredientsReducer from '../reducers/ingredients';
import {stateAddCalcs} from '../transformers/bread';
import BreadMixesContext from '../context/bread-mixer-context';

/** @module */

/**
 * Responsible for rendering a SaltList component.
 * @function
 *
 * @return {Object}
 */
const SaltList = () => {
	const {ingredients} = useContext(BreadMixesContext);
	const salts = ingredientsReducer(stateAddCalcs(ingredients), getSalts());

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: SaltList`);
			return () => {
				console.log(`componentDidUnmount: SaltList`)
			}
		},
		[]
	);

	return salts.map(
		(ingredient, i) => {
			return (
				<Salt
				id={ingredient.id}
				weight={ingredient.data.weight}
				key={i}
				contributionTotal={ingredient.calcs.contributionTotal}
				contributionFlours={ingredient.calcs.contributionFlours}
				/>
			);
		}
	);
};

export { SaltList as default };