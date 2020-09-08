import Lexicon from './Lexicon';
import Flour from './Flour';
import Liquid from './Liquid';

/**
 * Responsible for creating a new StarterLexicon.
 *
 * @class
 * @classdesc A StarterLexicon provides a vocabulary for use in a Starter.
 * @see Starter
 * @extends Lexicon
 */
class StarterLexicon extends Lexicon {
	constructor(){
		super();
		this.set('Flour', Flour);
		this.set('Liquid', Liquid);
	}
}

export {StarterLexicon as default};