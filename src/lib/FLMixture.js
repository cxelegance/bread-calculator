import Mixture from './Mixture';
import Liquid from './Liquid';

/**
 * Responsible for creating a new FLMixture.
 *
 * @abstract
 * @class
 * @classdesc A Mixture that involves (but is not limited to) ingredients of both types: Flour and Liquid.
 * @implements HydrationInterface
 * @extends Mixture
 * @see Liquid
 * @see Flour
 * @see BreadLexicon
 */
class FLMixture extends Mixture {
	/**
	 * @param {Lexicon}                 lexicon          A lexicon of ingredient types supported; must include Flour and Liquid.
	 * @param {String}                  [description=''] A description of this mixture.
	 * @param {Ingredient[]|Mixture[]}  [ingredients=[]] An array of ingredients, some of which may be mixtures.
	 * @throws {Error}
	 *
	 * @returns {FLMixture}
	 */
	constructor(lexicon, description = '', ingredients = []){
		super(lexicon, description, ingredients);
		if(this.constructor === FLMixture){
			throw new Error('FLMixture is an abstract class and must be extended');
		}
		if(!this.getWeightFlour || !this.getWeightLiquid){
			throw new Error('FLMixture must have Liquid and Flour in its lexicon');
		}
		if(super.getWeightIngredientsLiquid){
			throw new Error('undesirable collision: getWeightIngredientsLiquid() is defined on super');
		}
		if(super.getWeightMixturesLiquid){
			throw new Error('undesirable collision: getWeightMixturesLiquid() is defined on super');
		}
	}

	// HydrationInterface#getHydration
	getHydration(){
		const hydration = this.getWeightLiquid() / this.getWeightFlour();
		return Number.isFinite(hydration) ? hydration : 0;
	}

	/**
	 * Responsible for setting a hydration level, if sufficient properties exist.
	 *
	 * @param {Number} h The new desired hydration for the mixture, expressed as a ratio rather than a percentage.
	 * @see HydrationInterface#setHydration
	 * @throws {Error}
	 * @throws {RangeError}
	 * @see #getHydration
	 * @see #getWeightIngredientsLiquid
	 * @see #getWeightMixturesLiquid
	 * @see Ingredient#setWeight
	 *
	 * @return {number} The output of getHydration().
	 */
	setHydration(h){
		if(!Number.isFinite(h)) throw new Error(`cannot calculate with infinite h: ${h}`);
		if(h < 0) throw new RangeError(`no such thing as a negative hydration; h: ${h}`);
		if(this.getLiquids().length == 0) throw new Error('add some Liquid ingredients first');

		const hydration = this.getHydration();
		const L = this.getWeightIngredientsLiquid();
		const l = this.getWeightMixturesLiquid();

		if(hydration == 0 || L == 0){
			/*
			 * There are Liquid ingredients present but none of them have any weight.
			 * If there's any hydration at all, it's in Mixture ingredients, which we won't touch.
			 * A lazy solution is to add a gram to each Liquid present, not touching Mixtures,
			 * and then call this method again with the desired h.
			 * This will result in weight being distributed evenly across all the Liquid ingredients.
			 */
			 this.ingredients.forEach(
 				ingredient => {
 					if(ingredient instanceof Liquid){
 						ingredient.setWeight(1);
 					}
 				}
 			);
			return this.setHydration(h);
		}

		const mult = h / hydration;
		const multJustLiquids = Math.max(
			mult + (l * (mult - 1) / L), // do not adjust Liquids in Mixtures
			0 // do not allow negative hydration
		);
		this.ingredients.forEach(
			ingredient => {
				if(ingredient instanceof Liquid){
					ingredient.setWeight(multJustLiquids * ingredient.getWeight());
				}
			}
		);
		return this.getHydration();
	}

	/**
	 * Responsible for getting the weight of any Liquid ingredients found in this mixture's ingredients array.
	 *
	 * @see Liquid
	 * @see Liquid#getWeight
	 *
	 * @return {Number} Total weight found in the search.
	 */
	getWeightIngredientsLiquid(){
		return this.ingredients.reduce(
			(accumulator, ingredient) => accumulator + (ingredient instanceof Liquid ? ingredient.getWeight() : 0),
			0
		);
	}

	/**
	 * Responsible for getting the weight of all Liquid subingredients found inside Mixture
	 * ingredients (found in this mixture's ingredients array).
	 *
	 * @see Mixture#getIngredients
	 * @see Liquid
	 * @see Liquid#getWeight
	 *
	 * @return {Number} Total weight found in the search.
	 */
	getWeightMixturesLiquid(){
		return this.ingredients.reduce(
			(accumulator, ingredient) => {
				if(!(ingredient instanceof Mixture)) return accumulator;
				const weight = ingredient.getIngredients().reduce(
					(subAccum, subIngred) => {
						if(subIngred instanceof Mixture && subIngred.getWeightLiquid){
							return subAccum + subIngred.getWeightLiquid();
						}else if(subIngred instanceof Liquid){
							return subAccum + subIngred.getWeight();
						}else{
							return subAccum;
						}
					},
					0
				);
				return accumulator + weight;
			},
			0
		);
	}

	/**
	 * Responsible for returning all Liquid ingredients.
	 *
	 * @see Liquid
	 * @see Mixture#getIngredients
	 *
	 * @return {Liquid[]} [description]
	 */
	getLiquids(){
		return this.getIngredients().filter(
			ingredient => ingredient instanceof Liquid
		);
	}
}

export {FLMixture as default};