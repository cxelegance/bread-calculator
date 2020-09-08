import React, {useEffect, useContext} from 'react';

import Flour from '../components/Flour';

import {getFlours} from '../actions/ingredients';
import ingredientsReducer from '../reducers/ingredients';
import {stateAddCalcs} from '../transformers/bread';
import BreadMixesContext from '../context/bread-mixer-context';

/** @module */

/**
 * Responsible for rendering a FlourList component.
 * @function
 *
 * @return {Object}
 */
const FlourList = () => {
	const {ingredients} = useContext(BreadMixesContext);
	const flours = ingredientsReducer(stateAddCalcs(ingredients), getFlours());

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: FlourList`);
			return () => {
				console.log(`componentDidUnmount: FlourList`)
			}
		},
		[]
	);

	return flours.map(
		(ingredient, i) => {
			return (
				<Flour
				id={ingredient.id}
				description={ingredient.data.description}
				weight={ingredient.data.weight}
				key={i}
				contributionFlours={ingredient.calcs.contributionFlours}
				contributionTotal={ingredient.calcs.contributionTotal}
				/>
			) ;
		}
	);
};

export { FlourList as default };