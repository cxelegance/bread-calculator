import Mixture from '../../lib/Mixture';
import Starter from '../../lib/Starter';
import Bread from '../../lib/Bread';
import BreadLexicon from '../../lib/BreadLexicon';
import StarterLexicon from '../../lib/StarterLexicon';
import Ingredient from '../../lib/Ingredient';

import {
	starterFlour1, starterFlour2, starterLiquid1,
	starter2, bread2, flour1, liquid1, salt2, fat1,
	bread3, bread3b, bread3c

} from '../fixtures/ingredients';

const myBreadLexicon = new BreadLexicon();
const myStarterLexicon = new StarterLexicon();

test('Mixture cannot be instantiated: abstract class', () => {
	expect(
		() => new Mixture(new BreadLexicon(), 'my mixture', [])
	).toThrowError(new Error(`Mixture is an abstract class and must be extended`));
});

test('Mixture needs a child of Lexicon to be provided', () => {
	expect(
		() => new Starter(undefined, 'my mixture', [])
	).toThrowError(
		new TypeError('invalid instance of Lexicon abstract class')
	);
});

describe('Build a bread and calculate weights by ingredient/mixture type', () => {

	let myStarter, myBread;

	test('can build a starter and see correct valueOf()', () => {
		const description = starter2.data.description;
		const ingredients = [starterFlour1, starterFlour2, starterLiquid1].map(
			ingredient => {
				const ingredClass = myBreadLexicon.get(ingredient.type);
				const {description, weight} = ingredient.data;
				return new ingredClass(description, weight);
			}
		);
		myStarter = new Starter(myStarterLexicon, description, ingredients);
		expect(myStarter.valueOf()).toEqual(starter2);
	});

	test('Lexically added methods getWeight[type]() exist on starter', () => {
		expect(myStarter.getWeightFlour).toBeDefined();
		expect(myStarter.getWeightLiquid).toBeDefined();
	});

	test('new starter getWeight(), getWeightFlour(), getWeightLiquid() are correct', () => {
		expect(myStarter.getWeight()).toBe(starter2.data.weight);
		expect(myStarter.getWeightFlour()).toBe(starterFlour1.data.weight + starterFlour2.data.weight);
		expect(myStarter.getWeightLiquid()).toBe(starterLiquid1.data.weight);
	});

	test('getHydration() is correct', () => {
		expect(myStarter.getHydration()).toBeCloseTo(
			(starterLiquid1.data.weight) /
			(starterFlour1.data.weight + starterFlour2.data.weight),
			4
		);
	});

	test('Mixture sees this starter as a mixture', () => {
		expect(Mixture.isMixture(myStarter)).toBe(true);
	});

	test('Mixture sees Starter class as a mixture', () => {
		expect(Mixture.isMixture(Starter)).toBe(true);
	});

	test('Mixture.mixturify() returns an instance of Starter', () => {
		const starter = Mixture.mixturify(
			myBreadLexicon,
			starter2
		);
		expect(starter instanceof Starter).toBe(true);
		expect(Mixture.isMixture(starter)).toBe(true);
		expect(starter.valueOf()).toEqual(starter2);
	});

	test('can build the bread with starter and see correct valueOf()', () => {
		const description = bread2.data.description;
		const ingredients = [myStarter, flour1, liquid1, salt2, fat1].map(
			ingredient => {
				let description, weight, ingredients, ingredClass;
				if(ingredient instanceof Starter){
					description = ingredient.getDescription();
					ingredients = ingredient.getIngredients();
					ingredClass =  myBreadLexicon.get(ingredient.getType());
					return new ingredClass(myStarterLexicon, description, ingredients);
				}else if(ingredient instanceof Mixture){
					throw new Error('unexpected Mixture encountered');
				}else{
					({description, weight} = ingredient.data);
					ingredClass = myBreadLexicon.get(ingredient.type);
					return new ingredClass(description, weight);
				}
			}
		);
		myBread = new Bread(myBreadLexicon, description, ingredients);
		expect(myBread.valueOf()).toEqual(bread2);
	});

	test('Lexically added methods getWeight[type]() exist on bread', () => {
		expect(myBread.getWeightStarter).toBeDefined();
		expect(myBread.getWeightFlour).toBeDefined();
		expect(myBread.getWeightLiquid).toBeDefined();
		expect(myBread.getWeightSalt).toBeDefined();
		expect(myBread.getWeightFat).toBeDefined();
	});

	test('new bread getWeight(), getWeight[type]() are correct', () => {
		expect(myBread.getWeight()).toBe(bread2.data.weight);
		expect(myBread.getWeightStarter()).toBe(
			starterFlour1.data.weight + starterFlour2.data.weight + starterLiquid1.data.weight
		);
		expect(myBread.getWeightFlour()).toBe(
			flour1.data.weight + starterFlour1.data.weight + starterFlour2.data.weight
		);
		expect(myBread.getWeightLiquid()).toBe(
			liquid1.data.weight + starterLiquid1.data.weight
		);
		expect(myBread.getWeightSalt()).toBe(
			salt2.data.weight
		);
		expect(myBread.getWeightFat()).toBe(
			fat1.data.weight
		);
	});

	test('getHydration() is correct', () => {
		expect(myBread.getHydration()).toBeCloseTo(
			(liquid1.data.weight + starterLiquid1.data.weight) /
			(flour1.data.weight + starterFlour1.data.weight + starterFlour2.data.weight),
			4
		);
	});

	test('Mixture sees this bread as a mixture', () => {
		expect(Mixture.isMixture(myBread)).toBe(true);
	});

	test('Mixture sees Bread class as a mixture', () => {
		expect(Mixture.isMixture(Bread)).toBe(true);
	});

	test('Mixture.mixturify() returns an instance of Bread', () => {
		const bread = Mixture.mixturify(
			myBreadLexicon,
			bread2
		);
		expect(bread instanceof Bread).toBe(true);
		expect(Mixture.isMixture(bread)).toBe(true);
		expect(bread.valueOf()).toEqual(bread2);
	});

	test('Mixture setWeight() can correctly increase weight of a bread', () => {
		const bread = Mixture.mixturify(
			myBreadLexicon,
			bread3
		);
		const newWeight = bread.setWeight(200);
		expect(newWeight).toBe(200);
		expect(bread.valueOf()).toEqual(bread3b);
	});

	test('Mixture setWeight() can correctly decrease weight of a bread', () => {
		const bread = Mixture.mixturify(
			myBreadLexicon,
			bread3b
		);
		const newWeight = bread.setWeight(100);
		expect(newWeight).toBe(100);
		expect(bread.valueOf()).toEqual(bread3c);
	});

});