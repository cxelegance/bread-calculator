import Ingredient from './Ingredient';

/**
 * Responsible for creating a new Liquid.
 *
 * @class
 * @classdesc A Liquid is an Ingredient (which might be part of a Mixture).
 * @see Mixture
 * @extends Ingredient
 */
class Liquid extends Ingredient {
	type = 'Liquid';
}

export {Liquid as default};