import React, { useReducer, useEffect } from 'react';

import ingredientsReducer from '../reducers/ingredients';
import {addSalt} from '../actions/ingredients';
import BreadMixerContext from '../context/bread-mixer-context';
import BreadMixer from '../components/BreadMixer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppStorage from '../lib/AppStorage';
const storage = new AppStorage(
	process.env.LS_ITEM_NAME,
	process.env.LS_ID_NAME,
	process.env.LS_NAMESPACE
);

/** @module */

/**
 * Responsible for rendering a BreadMixerWithReducer component, which provides a BreadMixerContext
 * to its subcomponents.
 * @function
 *
 * @return {Object}
 */
const BreadMixerWithReducer = () => {
	const [ingredients, dispatch] = useReducer(
		ingredientsReducer, storage.getIngredients() /* default state */
	);

	// componentDidMount: load the data, also see that componentDidUnmount is a returned function
	useEffect(
		() => {
			console.log('componentDidMount: BreadMixerWithReducer');
			if(!ingredients.length){
				dispatch(addSalt({weight: 0, description: ''}));
			}
			return () => console.log('componentDidUnmount: BreadMixerWithReducer');
		},
		[]
	);

	// componentDidUpdate: ingredients only
	useEffect(
		() => {
			console.log('componentDidUpdate: BreadMixerWithReducer has ingredients updated');
			storage.setIngredients(ingredients);
		},
		[ingredients]
	);

	return (
		<BreadMixerContext.Provider value={ ({ingredients, dispatch}) }>
			<div className="content-container">
				<Header />
				<BreadMixer />
				<Footer />
			</div>
		</BreadMixerContext.Provider>
	);
};

export {BreadMixerWithReducer as default};