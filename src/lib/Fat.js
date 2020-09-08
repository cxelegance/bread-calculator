import Ingredient from './Ingredient';

/**
 * Responsible for creating a new Fat.
 *
 * @class
 * @classdesc A Fat is an Ingredient (which might be part of a Mixture).
 * @see Mixture
 * @extends Ingredient
 */
class Fat extends Ingredient {
	type = 'Fat';
}

export {Fat as default};