/**
 * Exports actions related to ingredients.
 *
 * @module
 * @see tests/fixtures/ingredients.js
 */

import Mixture from '../lib/Mixture';
import Starter from '../lib/Starter';
import Flour from '../lib/Flour';
import Liquid from '../lib/Liquid';
import Salt from '../lib/Salt';
import BreadLexicon from '../lib/BreadLexicon';
import AppStorage from '../lib/AppStorage';
const storage = new AppStorage(
	process.env.LS_ITEM_NAME,
	process.env.LS_ID_NAME,
	process.env.LS_NAMESPACE
);

const breadLexicon = new BreadLexicon();

/**
 * Responsible for forming a reducer action for adding a "mixture" ingredient.
 * @function
 *
 * @param  {Object} p                    Params are wrapped in this object.
 * @param  {String} p.description        A description of the mixture.
 * @param  {Object} p.flour              Flour params are wrapped in this object.
 * @param  {String} p.flour.description  A description of the flour.
 * @param  {Number} p.flour.weight       The weight of the flour.
 * @param  {Object} p.liquid             Liquid params are wrapped in this object.
 * @param  {String} p.liquid.description A description of the liquid.
 * @param  {Number} p.liquid.weight      The weight of the liquid.
 *
 * @return {Object}                      A reducer action for adding an ingredient.
 */
export const addMixture = ({description, flour, liquid}) => {
	const id = storage.getNextId();
	const myFlour = new Flour(flour.description, flour.weight);
	const myLiquid = new Liquid(liquid.description, liquid.weight);
	const ingredient = {id, ...(new Starter(breadLexicon, description, [myFlour, myLiquid]).valueOf())};
	return ({
		type: 'ADD_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for adding a "flour" ingredient.
 * @function
 *
 * @param  {Object} p             Params are wrapped in this object.
 * @param  {String} p.description A description of the ingredient.
 * @param  {Number} p.weight      The weight of the ingredient.
 *
 * @return {Object}               A reducer action for adding an ingredient.
 */
export const addFlour = ({description, weight}) => {
	const id = storage.getNextId();
	const ingredient = {id, ...(new Flour(description, weight).valueOf())};
	return ({
		type: 'ADD_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for adding a "liquid" ingredient.
 * @function
 *
 * @param  {Object} p             Params are wrapped in this object.
 * @param  {String} p.description A description of the ingredient.
 * @param  {Number} p.weight      The weight of the ingredient.
 *
 * @return {Object}               A reducer action for adding an ingredient.
 */
export const addLiquid = ({description, weight}) => {
	const id = storage.getNextId();
	const ingredient = {id, ...(new Liquid(description, weight).valueOf())};
	return ({
		type: 'ADD_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for adding a "salt" ingredient.
 * @function
 *
 * @param  {Object} p             Params are wrapped in this object.
 * @param  {String} p.description A description of the ingredient.
 * @param  {Number} p.weight      The weight of the ingredient.
 *
 * @return {Object}               A reducer action for adding an ingredient.
 */
export const addSalt = ({description, weight}) => {
	const id = storage.getNextId();
	const ingredient = {id, ...(new Salt(description, weight).valueOf())};
	return ({
		type: 'ADD_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for updating a "mixture" ingredient.
 * @function
 *
 * @param  {Object} p                    Params are wrapped in this object.
 * @param  {Number} p.id                 The ID of the ingredient.
 * @param  {String} p.description        A description of the mixture.
 * @param  {Object} p.flour              Flour params are wrapped in this object.
 * @param  {String} p.flour.description  A description of the flour.
 * @param  {Number} p.flour.weight       The weight of the flour.
 * @param  {Object} p.liquid             Liquid params are wrapped in this object.
 * @param  {String} p.liquid.description A description of the liquid.
 * @param  {Number} p.liquid.weight      The weight of the liquid.
 *
 * @return {Object}                      A reducer action for updating an ingredient.
 */
export const updateMixture = ({id, description, flour, liquid}) => {
	const myFlour = new Flour(flour.description, flour.weight);
	const myLiquid = new Liquid(liquid.description, liquid.weight);
	const ingredient = {id, ...(new Starter(breadLexicon, description, [myFlour, myLiquid]).valueOf())};
	return ({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for updating a "flour" ingredient.
 * @function
 *
 * @param  {Object} p             Params are wrapped in this object.
 * @param  {Number} p.id          The ID of the ingredient.
 * @param  {String} p.description A description of the ingredient.
 * @param  {Number} p.weight      The weight of the ingredient.
 *
 * @return {Object}               A reducer action for updating an ingredient.
 */
export const updateFlour = ({id, description, weight}) => {
	const ingredient = {id, ...(new Flour(description, weight).valueOf())};
	return ({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for updating a "liquid" ingredient.
 * @function
 *
 * @param  {Object} p             Params are wrapped in this object.
 * @param  {Number} p.id          The ID of the ingredient.
 * @param  {String} p.description A description of the ingredient.
 * @param  {Number} p.weight      The weight of the ingredient.
 *
 * @return {Object}               A reducer action for updating an ingredient.
 */
export const updateLiquid = ({id, description, weight}) => {
	const ingredient = {id, ...(new Liquid(description, weight).valueOf())};
	return ({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for updating a "salt" ingredient.
 * @function
 *
 * @param  {Object} p             Params are wrapped in this object.
 * @param  {Number} p.id          The ID of the ingredient.
 * @param  {String} p.description A description of the ingredient.
 * @param  {Number} p.weight      The weight of the ingredient.
 *
 * @return {Object}               A reducer action for updating an ingredient.
 */
export const updateSalt = ({id, description, weight}) => {
	const ingredient = {id, ...(new Salt(description, weight).valueOf())};
	return ({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for retrieving all "mixture" ingredients.
 * @function
 *
 * @return {Object}        A reducer action for retrieving some ingredients.
 */
export const getMixtures = () => {
	return ({
		type: 'JUST_MIXTURES'
	});
};

/**
 * Responsible for forming a reducer action for retrieving all "flour" ingredients.
 * @function
 *
 * @return {Object}        A reducer action for retrieving some ingredients.
 */
export const getFlours = () => {
	return ({
		type: 'JUST_FLOURS'
	});
};

/**
 * Responsible for forming a reducer action for retrieving all "liquid" ingredients.
 * @function
 *
 * @return {Object}        A reducer action for retrieving some ingredients.
 */
export const getLiquids = () => {
	return ({
		type: 'JUST_LIQUIDS'
	});
};

/**
 * Responsible for forming a reducer action for retrieving all "salt" ingredients.
 * @function
 *
 * @return {Object}        A reducer action for retrieving some ingredients.
 */
export const getSalts = () => {
	return ({
		type: 'JUST_SALTS'
	});
};

/**
 * Responsible for forming a reducer action for retrieving one ingredient by its ID.
 * @function
 *
 * @param  {Number} id The ID of the ingredient.
 *
 * @return {Object}    A reducer action for retrieving the ingredient.
 */
export const getIngredient = id => {
	const ingredient = {id};
	return ({
		type: 'JUST_ID',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for updating the JSON input field; note that
 * IDs will be (re)set for each ingredient.
 * @function
 *
 * @param  {String} json A JSON string representing all ingredients.
 *
 * @return {Object}      A reducer action for populating ingredients.
 */
export const updateJSON = json => {
	storage.setNextId(0);
	const ingredients = JSON.parse(json).map(
		ingredient => {
			ingredient.id = storage.getNextId();
			return ingredient;
		}
	);
	return ({
		type: 'POPULATE_INGREDIENTS',
		ingredients
	});
};

/**
 * Responsible for forming a reducer action for removing an ingredient.
 * @function
 *
 * @param  {Number} id The ID of the ingredient to remove.
 *
 * @return {Object}    A reducer action for removing an ingredient.
 */
export const removeIngredient = id => {
	const ingredient = {id};
	return ({
		type: 'REMOVE_INGREDIENT',
		ingredient
	});
};

/**
 * Responsible for forming a reducer action for reverting all ingredients.
 * @function
 *
 * @return {Object} A reducer action for reverting all ingredients.
 */
export const revertIngredients = () => {
	return ({
		type: 'REVERT_INGREDIENTS',
	});
};