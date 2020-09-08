/**
 * Responsible for abstractly defining an Ingredient.
 *
 * @abstract
 * @class
 * @classdesc An Ingredient, which may be part of a Mixture, is a basic element which has weight.
 * @see Mixture
 * @implements ValueInterface
 */
class Ingredient {
	/** @type {String} */
	description;

	/** @type {Number} */
	weight;

	/** @type {String} */
	type;

	/**
	 * @param {String} [description=''] A description of this ingredient.
	 * @param {Number} [weight=0]       The weight of this ingredient, unitless.
	 * @throws {Error}
	 *
	 * @returns {Ingredient}
	 */
	constructor(description = '', weight = 0){
		if(this.constructor === Ingredient){
			throw new Error('Ingredient is an abstract class and must be extended');
		}
		this.description = description;
		this.weight = weight;
	}

	/**
	 * Responsible for deriving/returning a tangible value for this object.
	 *
	 * @implements ValueInterface#valueOf
	 * @see #getDescription
	 * @see #getWeight
	 * @see #getType
	 *
	 * @return {{type: String, data: {description: String, weight: Number}}}
	 */
	valueOf(){
		const type = this.getType();
		const description = this.getDescription();
		const weight = this.getWeight();
		return ({
			type,
			data: {
				description,
				weight
			}
		});
	}

	/**
	 * Responsible for getting the overall weight of this ingredient.
	 *
	 * @return {Number} The weight, unitless.
	 */
	getWeight(){
		return this.weight;
	}

	/**
	 * Responsible for setting the weight of this ingredient.
	 *
	 * @param {Number} w The new weight value.
	 * @throws {TypeError}
	 * @see #getWeight
	 *
	 * @returns {Number}
	 */
	setWeight(w){
		if(!Number.isFinite(w)) throw new TypeError('weight should be a finite value');
		this.weight = w;
		return this.getWeight();
	}

	/**
	 * Responsible for getting the type of this ingredient.
	 *
	 * @see Lexicon
	 * @throws {TypeError}
	 *
	 * @return {String} A word from the the lexicon used in child class definition.
	 */
	getType(){
		if(typeof this.type != 'string'){
			// This type-check is made here because a child instance must define this property
			throw new TypeError('Ingredient->type should be a string');
		}
		return this.type;
	}

	/**
	 * Responsible for getting the description of this ingredient.
	 *
	 * @return {String}
	 */
	getDescription(){
		return this.description;
	}

	/**
	 * Responsible for setting the description of this ingredient.
	 *
	 * @param {String} desc Any descriptive text.
	 * @see #getDescription
	 * @throws {TypeError}
	 *
	 * @return {String}
	 */
	setDescription(desc){
		if(typeof desc != 'string') throw new TypeError('desc should be a string');
		this.description = desc;
		return this.getDescription();
	}

	/**
	 * Responsible for determining whether a value is an instance of Ingredient.
	 * @static
	 *
	 * @param  {*}       value Any value to test.
	 *
	 * @return {Boolean}
	 */
	static isIngredient(value){
		return (
			value instanceof Ingredient ||
			(value && value.prototype && value.prototype instanceof Ingredient)
		);
	}
}

export {Ingredient as default};