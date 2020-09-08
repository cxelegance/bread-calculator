import BreadLexicon from '../../lib/BreadLexicon';
import StarterLexicon from '../../lib/StarterLexicon';
import Flour from '../../lib/Flour';
import Liquid from '../../lib/Liquid';
import Salt from '../../lib/Salt';
import Fat from '../../lib/Fat';
import Starter from '../../lib/Starter';

import {
	flour1, liquid1, salt1, fat1, starter2,
	starterFlour1, starterFlour2, starterLiquid1
} from '../fixtures/ingredients';

const myBreadLexicon = new BreadLexicon();
const myStarterLexicon = new StarterLexicon();
const MyFlourClass = myBreadLexicon.get('Flour');
const myFlour = new MyFlourClass();
const MyLiquidClass = myBreadLexicon.get('Liquid');
const myLiquid = new MyLiquidClass();
const MySaltClass = myBreadLexicon.get('Salt');
const mySalt = new MySaltClass();
const MyFatClass = myBreadLexicon.get('Fat');
const myFat = new MyFatClass();
const MyStarterClass = myBreadLexicon.get('Starter');
const myStarter = new MyStarterClass(myStarterLexicon);

describe('BreadLexicon classes behave as expected', () => {

	test('BreadLexicon map has its props', () => {
		expect(myBreadLexicon.get('Flour') === Flour).toBe(true);
		expect(myBreadLexicon.get('Liquid') === Liquid).toBe(true);
		expect(myBreadLexicon.get('Salt') === Salt).toBe(true);
		expect(myBreadLexicon.get('Fat') === Fat).toBe(true);
		expect(myBreadLexicon.get('Starter') === Starter).toBe(true);
	});

	test('can instantiate the BreadLexicon classes via its props', ()=>{
		expect(myFlour instanceof Flour).toBe(true);
		expect(myLiquid instanceof Liquid).toBe(true);
		expect(mySalt instanceof Salt).toBe(true);
		expect(myFat instanceof Fat).toBe(true);
		expect(myStarter instanceof Starter).toBe(true);
	});

	test('instantiated Flour has default props', () => {
		expect(myFlour.getDescription()).toBe('');
		expect(myFlour.getWeight()).toBe(0);
		expect(myFlour.valueOf()).toEqual({
			type: Flour.name,
			data: {
				description: '',
				weight: 0
			}
		});
	});

	test('instantiated Flour has specified props', () => {
		const description = flour1.data.description;
		const weight = flour1.data.weight;
		const myFlour = new MyFlourClass(description, weight);
		expect(myFlour.getDescription()).toBe(description);
		expect(myFlour.getWeight()).toBe(weight);
		expect(myFlour.valueOf()).toEqual(flour1);
	});

	test('instantiated Liquid has default props', () => {
		expect(myLiquid.getDescription()).toBe('');
		expect(myLiquid.getWeight()).toBe(0);
		expect(myLiquid.valueOf()).toEqual({
			type: Liquid.name,
			data: {
				description: '',
				weight: 0
			}
		});
	});

	test('instantiated Liquid has specified props', () => {
		const description = liquid1.data.description;
		const weight = liquid1.data.weight;
		const myLiquid = new MyLiquidClass(description, weight);
		expect(myLiquid.getDescription()).toBe(description);
		expect(myLiquid.getWeight()).toBe(weight);
		expect(myLiquid.valueOf()).toEqual(liquid1);
	});

	test('instantiated Salt has default props', () => {
		expect(mySalt.getDescription()).toBe('');
		expect(mySalt.getWeight()).toBe(0);
		expect(mySalt.valueOf()).toEqual({
			type: Salt.name,
			data: {
				description: '',
				weight: 0
			}
		});
	});

	test('instantiated Salt has specified props', () => {
		const description = salt1.data.description;
		const weight = salt1.data.weight;
		const mySalt = new MySaltClass(description, weight);
		expect(mySalt.getDescription()).toBe(description);
		expect(mySalt.getWeight()).toBe(weight);
		expect(mySalt.valueOf()).toEqual(salt1);
	});

	test('instantiated Fat has default props', () => {
		expect(myFat.getDescription()).toBe('');
		expect(myFat.getWeight()).toBe(0);
		expect(myFat.valueOf()).toEqual({
			type: Fat.name,
			data: {
				description: '',
				weight: 0
			}
		});
	});

	test('instantiated Fat has specified props', () => {
		const description = fat1.data.description;
		const weight = fat1.data.weight;
		const myFat = new MyFatClass(description, weight);
		expect(myFat.getDescription()).toBe(description);
		expect(myFat.getWeight()).toBe(weight);
		expect(myFat.valueOf()).toEqual(fat1);
	});

	test('instantiated Starter has default props', () => {
		expect(myStarter.getDescription()).toBe('');
		expect(myStarter.getIngredients()).toEqual([]);
		expect(myStarter.valueOf()).toEqual({
			type: Starter.name,
			data: {
				description: '',
				ingredients: [],
				weight: 0,
				hydration: 0
			}
		});
	});

	test('instantiated Starter has specified props', () => {
		const description = starter2.data.description;
		const ingredients = starter2.data.ingredients.map(
			ingredient => {
				const ingredClass = myBreadLexicon.get(ingredient.type);
				const {description, weight} = ingredient.data;
				return new ingredClass(description, weight);
			}
		);
		const weight = starter2.data.weight;
		const myStarter = new MyStarterClass(myStarterLexicon, description, ingredients);
		expect(myStarter.getDescription()).toBe(description);
		expect(myStarter.getIngredients()).toEqual(ingredients);
		expect(myStarter.getIngredientsValueOf()).toEqual([
			starterFlour1,
			starterFlour2,
			starterLiquid1
		]);
		expect(myStarter.getWeight()).toBe(weight);
		expect(myStarter.valueOf()).toEqual(starter2);
	});

});
