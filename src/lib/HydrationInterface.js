/**
 * Responsible for creating a new object with hydration-related methods.
 *
 * @abstract
 * @class
 * @classdesc Offers signatures for hydration-related methods.
 * @interface HydrationInterface
 */
class HydrationInterface {

	constructor(){
		if(this.constructor === HydrationInterface){
			throw new Error('HydrationInterface is an interface and must be implemented');
		}
	}

	/**
	 * Responsible for calculating a hydration level, if sufficient properties exist.
	 *
	 * @return {number} liquid weight divided by dry weight, or zero if no dry weight.
	 */
	getHydration(){
		throw new Error('HydrationInterface::getHydration() is not yet defined');
	}

	/**
	 * Responsible for setting a hydration level, if sufficient properties exist.
	 *
	 * @param {Number} h The new desired hydration for the mixture, expressed as a ratio rather than a percentage.
	 *
	 * @return {number} The output of getHydration().
	 */
	setHydration(h){
		throw new Error('HydrationInterface::setHydration() is not yet defined');
	}
}

export {HydrationInterface as default};