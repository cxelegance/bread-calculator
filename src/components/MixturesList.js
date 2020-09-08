import React, {useEffect, useContext} from 'react';

import FlourWaterMixture from '../components/FlourWaterMixture';

import {getMixtures} from '../actions/ingredients';
import ingredientsReducer from '../reducers/ingredients';
import {stateAddCalcs} from '../transformers/bread';
import BreadMixesContext from '../context/bread-mixer-context';

/** @module */

/**
 * Responsible for rendering a MixturesList component.
 * @function
 *
 * @return {Object}
 */
const MixturesList = () => {
	const {ingredients} = useContext(BreadMixesContext);
	const mixtures = ingredientsReducer(stateAddCalcs(ingredients), getMixtures());

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: MixturesList`);
			return () => {
				console.log(`componentDidUnmount: MixturesList`)
			}
		},
		[]
	);

	// componentDidUpdate: ingredients
	useEffect(
		() => {
			console.log(
				`componentDidUpdate: MixturesList: ingredients updated`
			);
		},
		[ingredients]
	);

	return mixtures.map(
		(ingredient, i) => {
			const flourIndex = ingredient.data.ingredients[0].type == 'Flour' ? 0 : 1;
			const liquidIndex = 1 - flourIndex;
			return (
				<FlourWaterMixture
				id={ingredient.id}
				description={ingredient.data.description}
				flourDesc={ingredient.data.ingredients[flourIndex].data.description}
				flourWeight={ingredient.data.ingredients[flourIndex].data.weight}
				liquidDesc={ingredient.data.ingredients[liquidIndex].data.description}
				liquidWeight={ingredient.data.ingredients[liquidIndex].data.weight}
				hydration={ingredient.data.hydration}
				weight={ingredient.data.weight}
				key={i}
				flourContributionFlours={ingredient.data.ingredients[flourIndex].calcs.contributionFlours}
				liquidContributionLiquids={ingredient.data.ingredients[liquidIndex].calcs.contributionLiquids}
				mixtureContributionTotal={ingredient.calcs.contributionTotal}
				mixturePercentageFlours={ingredient.calcs.contributionFlours}
				/>
			) ;
		}
	);
};

export { MixturesList as default };