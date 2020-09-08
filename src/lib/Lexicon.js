
/**
 * Responsible for abstractly defining a Lexicon.
 *
 * @abstract
 * @class
 * @classdesc A Lexicon provides a vocabulary for use in a Mixture.
 * @see Mixture
 * @extends Map
 */
class Lexicon extends Map {
	constructor(){
		super();
		if(this.constructor === Lexicon){
			throw new Error('Lexicon is an abstract class and must be extended');
		}
	}
}

export {Lexicon as default};