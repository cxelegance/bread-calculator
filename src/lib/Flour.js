import Ingredient from './Ingredient';

/**
 * Responsible for creating a new Flour.
 *
 * @class
 * @classdesc A Flour is an Ingredient (which might be part of a Mixture).
 * @see Mixture
 * @extends Ingredient
 */
class Flour extends Ingredient {
	type = 'Flour';
}

export {Flour as default};