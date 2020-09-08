import Ingredient from './Ingredient';

/**
 * Responsible for creating a new Salt.
 *
 * @class
 * @classdesc A Salt is an Ingredient (which might be part of a Mixture).
 * @see Mixture
 * @extends Ingredient
 */
class Salt extends Ingredient {
	type = 'Salt';
}

export {Salt as default};