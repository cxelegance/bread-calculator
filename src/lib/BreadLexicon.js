import Lexicon from './Lexicon';
import Flour from './Flour';
import Liquid from './Liquid';
import Salt from './Salt';
import Fat from './Fat';
import Starter from './Starter';
import Bread from './Bread';

/**
 * Responsible for creating a new BreadLexicon.
 *
 * @class
 * @classdesc A BreadLexicon provides a vocabulary for use in a Bread.
 * @see Bread
 * @extends Lexicon
 */
class BreadLexicon extends Lexicon {
	constructor(){
		super();
		this.set('Flour', Flour);
		this.set('Liquid', Liquid);
		this.set('Salt', Salt);
		this.set('Fat', Fat);
		this.set('Starter', Starter);
		this.set('Bread', Bread);
	}
}

export {BreadLexicon as default};