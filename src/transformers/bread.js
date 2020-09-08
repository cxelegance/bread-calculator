/**
 * Exports methods for transforming data to and from app state; the form of data in app state
 * is different from the datatypes used by the accompanying libraries (Bread, Mixture, etc.) as well
 * as from the form encountered in valueOf() methods attached to said libraries.
 *
 * @module
 * @see Bread
 */

import Bread from '../lib/Bread';
import Liquid from '../lib/Liquid';
import Flour from '../lib/Flour';
import BreadLexicon from '../lib/BreadLexicon';
import Mixture from '../lib/Mixture';
import {twoDecimal} from '../lib/calculators';

/** @type {BreadLexicon} */
const breadLexicon = new BreadLexicon();

/**
 * Responsible for transforming app state data into the form returned by Bread::valueOf();
 * this transformation is lossy in that some props (e.g., id) will be lost.
 * @function
 *
 * @param  {Object[]} state Ingredients as stored in the app state.
 * @see Bread#valueOf
 *
 * @return {Object} This object is of the form returned by Bread::valueOf.
 */
export const stateToBreadValue = state => {
	const ingredients = [...state];
	const value = {
		type: 'Bread',
		data: {
			// the weight is not used by Mixture::mixturify() and can be calculated later by doing Bread::getWeight()
			// hydration also is not used by Mixture::mixturify()
			description: 'ingredients transformed into bread', // the app doesn't have a bread description
			ingredients
		}
	};
	const bread = Mixture.mixturify(breadLexicon, value);
	return bread.valueOf();
};

/**
 * Responsible for transforming app state data into an instance of Bread;
 * this transformation is lossy in that some props (e.g., id) will be lost.
 * @function
 *
 * @param  {Object[]} state Ingredients as stored in the app state.
 *
 * @return {Bread}
 */
export const stateToBread = state => {
	const ingredients = [...state];
	const value = {
		type: 'Bread',
		data: {
			// the weight is not used by Mixture::mixturify() and can be calculated later by doing Bread::getWeight()
			// hydration also is not used by Mixture::mixturify()
			description: 'ingredients transformed into bread', // the app doesn't have a bread description
			ingredients
		}
	};
	const bread = Mixture.mixturify(breadLexicon, value);
	return bread;
};

/**
 * Responsible for transforming a Bread object into an array of Liquid ingredients; no other ingredients
 * are included, not even Liquid subingredients found in Mixtures.
 * @function
 *
 * @param  {Bread} bread A bread to filter for Liquid.
 * @see Liquid
 * @see Bread#getIngredients
 *
 * @return {Liquid[]}
 */
export const breadToLiquids = bread => {
	return bread.getIngredients().filter(
		ingredient => ingredient instanceof Liquid
	);
};

/**
 * Responsible for transforming a Bread object into an array of Flour ingredients; no other ingredients
 * are included, not even Flour subingredients found in Mixtures.
 * @function
 *
 * @param  {Bread} bread A bread to filter for Flour.
 * @see Flour
 * @see Bread#getIngredients
 *
 * @return {Flour[]}
 */
export const breadToFlours = bread => {
	return bread.getIngredients().filter(
		ingredient => ingredient instanceof Flour
	);
};

/**
 * Responsible for transforming a Bread object into a set of totals that the app can use.
 * @function
 *
 * @param  {Bread} bread A bread to formulate totals for.
 *
 * @return {{total: Number, totalFlour: Number, totalLiquid: Number, totalSalt: Number, totalFat: Number, totalStarter: Number, totalBread: Number, hydration: Number}}
 */
export const breadToTotals = bread => {
	const total = bread.getWeight();
	const totalFlour = bread.getWeightFlour();
	const totalLiquid = bread.getWeightLiquid();
	const totalSalt = bread.getWeightSalt();
	const totalFat = bread.getWeightFat();
	const totalStarter = bread.getWeightStarter();
	const totalBread = bread.getWeightBread();
	const hydration = bread.getHydration();
	return ({
		total, totalFlour, totalLiquid, totalSalt, totalFat, totalStarter, totalBread , hydration
	});
};

/**
 * Responsible for transforming app state data by adding "calcs" property to each ingredient and
 * each mixture ingredient; calcs are: contributionFlours, contributionTotal, contributionLiquids
 * and percentageTotalFlour.
 * @function
 *
 * @param  {Object[]} state Ingredients as stored in the app state.
 *
 * @return {Object[]}       Same state but each ingredient has a "calcs" property
 */
export const stateAddCalcs = state => {
	const totals = {
		flours: 0,
		liquids: 0,
		other: 0
	};

	state.forEach(
		ingred => {
			switch(ingred.type){
				case "Starter":
					const flourIndex = ingred.data.ingredients[0].type === 'Flour' ? 0 : 1;
					const liquidIndex = 1 - flourIndex;
					totals.flours += ingred.data.ingredients[flourIndex].data.weight;
					totals.liquids += ingred.data.ingredients[liquidIndex].data.weight;
					break;
				case "Flour":
					totals.flours += ingred.data.weight;
					break;
				case "Liquid":
					totals.liquids += ingred.data.weight;
					break;
				case "Salt":
				default:
					totals.other += ingred.data.weight;
					break;
			}
		}
	);

	return state.map(
		ingredient => {
			/*
			 * Do not alter original state; you need to clone the ingredient. However, it must be cloned deeply,
			 * lest the original be affected on subproperties. As such, ingred = {...ingredient} is insufficient.
			 */
			const ingred = JSON.parse(JSON.stringify(ingredient));
			const weight = ingred.data.weight;
			ingred.calcs = {
				contributionFlours: null,
				contributionTotal: null,
				contributionLiquids: null,
			};
			switch(ingred.type){
				case "Starter":
					const flourIndex = ingred.data.ingredients[0].type === 'Flour' ? 0 : 1;
					const liquidIndex = 1 - flourIndex;
					const flourWeight = ingred.data.ingredients[flourIndex].data.weight;
					const liquidWeight = ingred.data.ingredients[liquidIndex].data.weight;
					ingred.data.ingredients[flourIndex].calcs = {};
					ingred.data.ingredients[flourIndex].calcs.contributionFlours = twoDecimal(flourWeight / totals.flours);
					ingred.data.ingredients[flourIndex].calcs.contributionTotal = twoDecimal(flourWeight / (totals.flours + totals.liquids + totals.other));
					ingred.data.ingredients[flourIndex].calcs.contributionLiquids = twoDecimal(flourWeight / totals.liquids);
					ingred.data.ingredients[liquidIndex].calcs = {};
					ingred.data.ingredients[liquidIndex].calcs.contributionFlours = twoDecimal(liquidWeight / totals.flours);
					ingred.data.ingredients[liquidIndex].calcs.contributionTotal = twoDecimal(liquidWeight / (totals.flours + totals.liquids + totals.other));
					ingred.data.ingredients[liquidIndex].calcs.contributionLiquids = twoDecimal(liquidWeight / totals.liquids);
				case "Flour":
				case "Liquid":
				case "Salt":
				default:
					ingred.calcs.contributionFlours = twoDecimal(weight / totals.flours);
					ingred.calcs.contributionTotal = twoDecimal(weight / (totals.flours + totals.liquids + totals.other));
					ingred.calcs.contributionLiquids = twoDecimal(weight / totals.liquids);
					break;
			}

			return ingred;
		}
	);
};