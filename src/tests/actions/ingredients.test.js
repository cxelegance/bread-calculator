import {
	addMixture, addFlour, addLiquid, addSalt,
	updateMixture, updateFlour, updateLiquid, updateSalt,
	getMixtures, getFlours, getLiquids, getSalts,
	removeIngredient, revertIngredients, updateJSON, getIngredient
} from '../../actions/ingredients';
import {
	flour1, liquid1, salt1, starterFlour1, starterLiquid1, starter1
} from '../fixtures/ingredients';
import AppStorage from '../../lib/AppStorage';
const storage = new AppStorage(
	process.env.LS_ITEM_NAME,
	process.env.LS_ID_NAME,
	process.env.LS_NAMESPACE
);

test('getIngredient should generate the JUST_ID action object', () => {
	const id = 2;
	const ingredient = {id};
	const action = getIngredient(id);
	expect(action).toEqual({
		type: 'JUST_ID',
		ingredient
	});
});

test('addMixture should generate the ADD_INGREDIENT action object', () => {
	const ingredient = {...starter1};
	ingredient.id = storage.setNextId(0);
	const description = ingredient.data.description;
	const flour = {
		description: starterFlour1.data.description,
		weight: starterFlour1.data.weight
	};
	const liquid = {
		description: starterLiquid1.data.description,
		weight: starterLiquid1.data.weight
	};
	const action = addMixture({description, flour, liquid});
	expect(action).toEqual({
		type: 'ADD_INGREDIENT',
		ingredient
	});
});

test('addFlour should generate the ADD_INGREDIENT action object', () => {
	const ingredient = {...flour1};
	ingredient.id = storage.setNextId(10);
	const description = ingredient.data.description;
	const weight = ingredient.data.weight;
	const action = addFlour({description, weight});
	expect(action).toEqual({
		type: 'ADD_INGREDIENT',
		ingredient
	});
});

test('addLiquid should generate the ADD_INGREDIENT action object', () => {
	const ingredient = {...liquid1};
	ingredient.id = storage.setNextId(100);
	const description = ingredient.data.description;
	const weight = ingredient.data.weight;
	const action = addLiquid({description, weight});
	expect(action).toEqual({
		type: 'ADD_INGREDIENT',
		ingredient
	});
});

test('addSalt should generate the ADD_INGREDIENT action object', () => {
	const ingredient = {...salt1};
	ingredient.id = storage.setNextId(1000);
	const description = ingredient.data.description;
	const weight = ingredient.data.weight;
	const action = addSalt({description, weight});
	expect(action).toEqual({
		type: 'ADD_INGREDIENT',
		ingredient
	});
});

test('updateMixture should generate the UPDATE_INGREDIENT action object', () => {
	const ingredient = {...starter1};
	ingredient.id = 0;
	const id = storage.setNextId(0);
	const description = ingredient.data.description;
	const flour = {
		description: starterFlour1.data.description,
		weight: starterFlour1.data.weight
	};
	const liquid = {
		description: starterLiquid1.data.description,
		weight: starterLiquid1.data.weight
	};
	const action = updateMixture({id, description, flour, liquid});
	expect(action).toEqual({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
});

test('updateFlour should generate the UPDATE_INGREDIENT action object', () => {
	const ingredient = {...flour1};
	ingredient.id = 11;
	const id = storage.setNextId(11);
	const description = ingredient.data.description;
	const weight = ingredient.data.weight;
	const action = updateFlour({id, description, weight});
	expect(action).toEqual({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
});

test('updateLiquid should generate the UPDATE_INGREDIENT action object', () => {
	const ingredient = {...liquid1};
	ingredient.id = 10;
	const id = storage.setNextId(10);
	const description = ingredient.data.description;
	const weight = ingredient.data.weight;
	const action = updateLiquid({id, description, weight});
	expect(action).toEqual({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
});

test('updateSalt should generate the UPDATE_INGREDIENT action object', () => {
	const ingredient = {...salt1};
	ingredient.id = 103;
	const id = storage.setNextId(103);
	const description = ingredient.data.description;
	const weight = ingredient.data.weight;
	const action = updateSalt({id, description, weight});
	expect(action).toEqual({
		type: 'UPDATE_INGREDIENT',
		ingredient
	});
});

test('getMixtures should generate the JUST_MIXTURES action object', () => {
	const action = getMixtures();
	expect(action).toEqual({
		type: 'JUST_MIXTURES',
	});
});

test('getFlours should generate the JUST_FLOURS action object', () => {
	const action = getFlours();
	expect(action).toEqual({
		type: 'JUST_FLOURS',
	});
});

test('getLiquids should generate the JUST_LIQUIDS action object', () => {
	const action = getLiquids();
	expect(action).toEqual({
		type: 'JUST_LIQUIDS',
	});
});

test('getSalts should generate the JUST_SALTS action object', () => {
	const action = getSalts();
	expect(action).toEqual({
		type: 'JUST_SALTS',
	});
});

test('removeIngredient should generate the REMOVE_INGREDIENT action object', () => {
	const id = 0;
	const ingredient = {id}
	const action = removeIngredient(id);
	expect(action).toEqual({
		type: 'REMOVE_INGREDIENT',
		ingredient
	});
});

test('revertIngredients should generate the REVERT_INGREDIENTS action object', () => {
	const action = revertIngredients();
	expect(action).toEqual({
		type: 'REVERT_INGREDIENTS'
	});
});

test('updateJSON should generate the POPULATE_INGREDIENTS action object', () => {
	const toBeStrung = [{id: 0, my: 'object', is: 'nice', end: null}, {id: 1, other: 'object'}];
	const toBeParsed = JSON.stringify(toBeStrung);
	const action = updateJSON(toBeParsed);
	const ingredients = JSON.parse(toBeParsed);
	expect(action).toEqual({
		type: 'POPULATE_INGREDIENTS',
		ingredients
	});
});
