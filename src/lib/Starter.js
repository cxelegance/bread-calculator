import FLMixture from './FLMixture';

/**
 * Responsible for creating a new Starter.
 *
 * @class
 * @classdesc A Starter combines Ingredients or other Mixtures, whose types are defined by either a StarterLexicon or a BreadLexicon.
 * @see Ingredient
 * @see StarterLexicon
 * @see BreadLexicon
 * @extends FLMixture
 */
class Starter extends FLMixture {
	type = 'Starter';
}

export {Starter as default};