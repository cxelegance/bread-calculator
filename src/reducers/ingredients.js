/**
 * Exports a reducer related to actions for ingredients.
 *
 * @module
 */

/**
 * Responsible for reducing provided state/ingredients and action to a new state/ingredients.
 * @function
 *
 * @param  {Object[]}  ingredients An array of ingredients; this is the current state.
 * @param  {Object}    action      An action described by a type property, and often an ingredients or ingredient property to act upon.
 *
 * @return {Object[]}              A new state/ingredients.
 */
const ingredientsReducer = (ingredients /* state */, action) => {
	switch(action.type){
		case 'JUST_ID':
			return ingredients.filter(
				ingredient => ingredient.id === action.ingredient.id
			);
		case 'POPULATE_INGREDIENTS':
			return action.ingredients;
		case 'ADD_INGREDIENT':
			return [...ingredients, action.ingredient];
		case 'REMOVE_INGREDIENT':
			return ingredients.filter(
				ingredient => ingredient.id !== action.ingredient.id
			);
		case 'UPDATE_INGREDIENT':
			return ingredients.map(
				ingredient => ingredient.id === action.ingredient.id ? action.ingredient : ingredient
			);
		case 'JUST_MIXTURES':
			return ingredients.filter(
				ingredient => ingredient.type === 'Starter'
			);
		case 'JUST_FLOURS':
			return ingredients.filter(
				ingredient => ingredient.type === 'Flour'
			);
		case 'JUST_LIQUIDS':
			return ingredients.filter(
				ingredient => ingredient.type === 'Liquid'
			);
		case 'JUST_SALTS':
			return ingredients.filter(
				ingredient => ingredient.type === 'Salt'
			);
		case 'REVERT_INGREDIENTS': // intentional fall-through
		default:
			return ingredients;
	}
};

export { ingredientsReducer as default };