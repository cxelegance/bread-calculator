import FLMixture from './FLMixture';

/**
 * Responsible for creating a new Bread.
 *
 * @class
 * @classdesc A Bread combines Ingredients or other Mixtures, whose types are defined by a BreadLexicon.
 * @see Mixture
 * @see BreadLexicon
 *
 * @extends FLMixture
 */
class Bread extends FLMixture {
	type = 'Bread';
}

export {Bread as default};