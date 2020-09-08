import ingredientsReducer from '../../reducers/ingredients';
import {stateBread1 as currentIngredients, newIngredient} from '../fixtures/ingredients';

test('undefined type should return currentIngredients', () => {
	const ingredients = [...currentIngredients];
	ingredients.pop(); // make it different
	const action = {type: undefined, ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(currentIngredients);
});

test('default should return currentIngredients', () => {
	const ingredients = [...currentIngredients];
	ingredients.pop(); // make it different
	const action = {type: '?', ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(currentIngredients);
});

test('JUST_ID should return array of one ingredient matching provided ID', () => {
	let ingredient = {id: 0};
	let action = {type: 'JUST_ID', ingredient};
	let result = [currentIngredients[0]];
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(
		result
	);

	ingredient = {id: 1};
	action = {type: 'JUST_ID', ingredient};
	result = [currentIngredients[1]];
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(
		result
	);

	ingredient = {id: 2};
	action = {type: 'JUST_ID', ingredient};
	result = [currentIngredients[2]];
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(
		result
	);
});

test('POPULATE_INGREDIENTS should return exact ingredients that are sent', () => {
	const ingredients = [...currentIngredients];
	ingredients.pop(); // make it different
	const action = {type: 'POPULATE_INGREDIENTS', ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(ingredients);
});

test('ADD_INGREDIENT should return currentIngredients with new ingredient added', () => {
	const action = {type: 'ADD_INGREDIENT', ingredient: newIngredient};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual([...currentIngredients, newIngredient]);
});

test('REMOVE_INGREDIENT should return currentIngredients with specified ingredient absent', () => {
	const action = {type: 'REMOVE_INGREDIENT', ingredient: newIngredient};
	const currentIngredients2 = [...currentIngredients, newIngredient];
	expect(
		ingredientsReducer(currentIngredients2, action)
	).toEqual(currentIngredients);
});

test('UPDATE_INGREDIENT should return currentIngredients with specified ingredient modified', () => {
	const modifiedIngredient = {...newIngredient};
	modifiedIngredient.data.weight = 10;
	const action = {type: 'UPDATE_INGREDIENT', ingredient: modifiedIngredient};
	const currentIngredients2 = [newIngredient, ...currentIngredients]; // messing with the order should not affect outcome
	expect(
		ingredientsReducer(currentIngredients2, action)
	).toEqual([modifiedIngredient, ...currentIngredients]);
});

test('JUST_MIXTURES should return currentIngredients that are mixtures', () => {
	const ingredients = [...currentIngredients];
	const filteredIngredients = [currentIngredients[0]];
	const action = {type: 'JUST_MIXTURES', ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(filteredIngredients);
});

test('JUST_FLOURS should return currentIngredients that are flours', () => {
	const ingredients = [...currentIngredients];
	const filteredIngredients = [currentIngredients[1]];
	const action = {type: 'JUST_FLOURS', ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(filteredIngredients);
});

test('JUST_LIQUIDS should return currentIngredients that are liquids', () => {
	const ingredients = [...currentIngredients];
	const filteredIngredients = [currentIngredients[2]];
	const action = {type: 'JUST_LIQUIDS', ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(filteredIngredients);
});

test('JUST_SALTS should return currentIngredients that are salts', () => {
	const ingredients = [...currentIngredients];
	const filteredIngredients = [currentIngredients[3]];
	const action = {type: 'JUST_SALTS', ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(filteredIngredients);
});

test('REVERT_INGREDIENTS should return currentIngredients', () => {
	const ingredients = [...currentIngredients];
	ingredients.pop(); // make it different
	const action = {type: 'REVERT_INGREDIENTS', ingredients};
	expect(
		ingredientsReducer(currentIngredients, action)
	).toEqual(currentIngredients);
});