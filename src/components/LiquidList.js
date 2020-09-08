import React, {useEffect, useContext} from 'react';

import Liquid from '../components/Liquid';

import {getLiquids} from '../actions/ingredients';
import ingredientsReducer from '../reducers/ingredients';
import {stateAddCalcs} from '../transformers/bread';
import BreadMixesContext from '../context/bread-mixer-context';

/** @module */

/**
 * Responsible for rendering a LiquidList component.
 * @function
 *
 * @return {Object}
 */
const LiquidList = () => {
	const {ingredients} = useContext(BreadMixesContext);
	const liquids = ingredientsReducer(stateAddCalcs(ingredients), getLiquids());

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: LiquidList`);
			return () => {
				console.log(`componentDidUnmount: LiquidList`)
			}
		},
		[]
	);

	return liquids.map(
		(ingredient, i) => {
			return (
				<Liquid
				id={ingredient.id}
				description={ingredient.data.description}
				weight={ingredient.data.weight}
				key={i}
				contributionTotal={ingredient.calcs.contributionTotal}
				contributionLiquids={ingredient.calcs.contributionLiquids}
				contributionFlours={ingredient.calcs.contributionFlours}
				/>
			) ;
		}
	);
};

export { LiquidList as default };