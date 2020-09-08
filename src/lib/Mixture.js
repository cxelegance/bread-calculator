import Lexicon from './Lexicon';
import Ingredient from './Ingredient';

/**
 * Responsible for abstractly defining a Mixture.
 *
 * @abstract
 * @class
 * @classdesc A Mixture combines Ingredients or other Mixtures, whose types are defined by a Lexicon.
 * @see Ingredient
 * @see Lexicon
 * @implements ValueInterface
 */
class Mixture {
	/** @type {String} */
	description;

	/** @type {Ingredient[]|Mixture[]} */
	ingredients;

	/** @type {String} */
	type;

	/**
	 * @param {Lexicon}                 lexicon          A lexicon of ingredient types supported.
	 * @param {String}                  [description=''] A description of this mixture.
	 * @param {Ingredient[]|Mixture[]}  [ingredients=[]] An array of ingredients, some of which may be mixtures.
	 * @throws {Error}
	 * @throws {TypeError}
	 * @see #constructGetWeights
	 *
	 * @returns {Mixture}
	 */
	constructor(lexicon, description = '', ingredients = []){
		if(this.constructor === Mixture){
			throw new Error('Mixture is an abstract class and must be extended');
		}
		if(!(lexicon instanceof Lexicon)){
			throw new TypeError('invalid instance of Lexicon abstract class');
		}
		this.description = description;
		this.ingredients = ingredients;
		this.#constructGetWeights(lexicon);
	}

	/**
	 * Responsible for constructing instance getter methods for the weights of any type defined in
	 * the lexicon; look for methods on the instance of this class of the form: getWeight+Type;
	 * e.g. getWeightSalt(), getWeightFat(), etc.
	 * @function Mixture#constructGetWeights
	 * @private
	 *
	 * @param {Lexicon} lexicon A lexicon of ingredient types supported.
	 * @see Ingredient#getWeight
	 *
	 * @returns void
	 */
	#constructGetWeights(lexicon){
		lexicon.forEach(
			(className, name) => {
				this[`getWeight${name}`] = () => {
					return this.ingredients.reduce(
						(accumulator, ingredient) => {
							if(ingredient instanceof className){
								return accumulator + ingredient.getWeight();
							}else if(ingredient instanceof Mixture){
								let getWeightType = ingredient[`getWeight${name}`] || (() => 0);
								return accumulator + getWeightType();
							}else{
								return accumulator;
							}
						},
						0
					);
				}
			}
		);
	}

	/**
	 * Responsible for deriving/returning a tangible value for this object.
	 *
	 * @implements ValueInterface#valueOf
	 *
	 * @returns {{type: String, data: {description: String, ingredients: Ingredient[]|Mixture[], weight: Number}}}
	 */
	valueOf(){
		const description = this.getDescription();
		const type = this.getType();
		const ingredients = this.getIngredientsValueOf();
		const weight = this.getWeight();
		const hydration = this.getHydration();
		return ({
			type,
			data: {
				description,
				ingredients,
				weight,
				hydration
			}
		});
	}

	/**
	 * Responsible for getting the overall weight of this mixture.
	 *
	 * @returns {Number} The weight, unitless.
	 */
	getWeight(){
		return this.ingredients.reduce(
			(accumulator, ingredient) => accumulator + ingredient.getWeight(),
			0
		);
	}

	/**
	 * Responsible for setting the weight of the mixture by proportionately adjusting each ingredient.
	 *
	 * @param {Number} w The new desired weight for the mixture.
	 * @see #getWeight
	 * @throws {Error}
	 *
	 * @returns {Number} The new weight as calculated by getWeight().
	 */
	setWeight(w){
		const weight = this.getWeight();
		if(weight == 0) throw new Error('add some ingredients with weight first');
		const mult = w / weight;
		if(!Number.isFinite(mult)) throw new Error(`bad multiplier calculated with w: ${w}`);
		this.ingredients.forEach(
			ingredient => ingredient.setWeight(mult * ingredient.getWeight())
		);
		return this.getWeight();
	}

	/**
	 * Responsible for getting the type of this mixture.
	 *
	 * @see Lexicon
	 * @throws {TypeError}
	 *
	 * @returns {String} A word from the the lexicon used during instantiation.
	 */
	getType(){
		if(typeof this.type != 'string'){
			// This type-check is made here because a child instance must define this property
			throw new TypeError('Mixture->type should be a string');
		}
		return this.type;
	}

	/**
	 * Responsible for returning the ingredients in this mixture.
	 *
	 * @returns {Ingredient[]|Mixture[]} An array of ingredients, some of which may be mixtures.
	 */
	getIngredients(){
		return this.ingredients;
	}

	/**
	 * Responsible for getting the ingredients in this mixture in valueOf() form.
	 *
	 * @see ValueInterface
	 * @see #valueOf
	 *
	 * @returns {Object[]} An array of objects, each respresenting an ingredient.
	 */
	getIngredientsValueOf(){
		return this.ingredients.map(
			ingredient => ingredient.valueOf()
		);
	}

	/**
	 * Responsible for getting the description of this mixture.
	 *
	 * @returns {String}
	 */
	getDescription(){
		return this.description;
	}

	/**
	 * Responsible for determining whether a value is an instance of Mixture.
	 * @static
	 *
	 * @param  {*}       value Any value to test.
	 *
	 * @returns {Boolean}
	 */
	static isMixture(value){
		return (
			value instanceof Mixture ||
			(value && value.prototype && value.prototype instanceof Mixture)
		);
	}

	/**
	 * Responsible for parsing an object and, if it is of the right form, transforming it into
	 * an instance of a Mixture subclass.
	 * @static
	 *
	 * @see #type
	 * @see #valueOf
	 * @see Lexicon
	 * @throws {TypeError}
	 *
	 * @param {Lexicon} lexicon A lexicon of ingredient types supported.
	 * @param {Object}  value   An object of the form encountered in valueOf().
	 *
	 * @returns {Mixture}        An instance of the class indicated in the value.
	 */
	static mixturify(lexicon, value){
		const lexClass = lexicon.get(value.type);
		if(Mixture.isMixture(lexClass)){
			return new lexClass(
				lexicon,
				value.data.description,
				value.data.ingredients.map(
					ingredient => Mixture.mixturify(lexicon, ingredient)
				)
			);
		}else if(Ingredient.isIngredient(lexClass)){
			return new lexClass(value.data.description, value.data.weight);
		}else{
			throw new TypeError(`mixturify: unknown class/type: ${value.type}`);
		}
	}
}

export {Mixture as default};