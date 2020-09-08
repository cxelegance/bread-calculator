/**
 * Responsible for creating a new object with a valueOf() method.
 *
 * @abstract
 * @class
 * @classdesc Offers a signature for a valueOf() method.
 * @interface ValueInterface
 */
class ValueInterface {

	constructor(){
		if(this.constructor === ValueInterface){
			throw new Error('ValueInterface is an interface and must be implemented');
		}
	}

	/**
	 * Responsible for deriving/returning a tangible value for this object.
	 *
	 * @return {{type: String, data: Object}}
	 */
	valueOf(){
		throw new Error('ValueInterface::valueOf() is not yet defined');
	}

}

export {ValueInterface as default};