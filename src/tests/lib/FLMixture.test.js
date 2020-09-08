import Mixture from '../../lib/Mixture';
import FLMixture from '../../lib/FLMixture';
import BreadLexicon from '../../lib/BreadLexicon';

import {
	bread3c, bread3d, bread3e, bread4, bread4b, bread4c, bread4d, bread4e
} from '../fixtures/ingredients';

const myBreadLexicon = new BreadLexicon();

test('FLMixture setHydration() can correctly increase hydration of a bread', () => {
	const bread = Mixture.mixturify(
		myBreadLexicon,
		bread3c
	);
	const newHydration = bread.setHydration(1);
	expect(newHydration).toBe(1);
	expect(bread.valueOf()).toEqual(bread3d);
});

test('FLMixture setHydration() can correctly decrease hydration of a bread', () => {
	let bread = Mixture.mixturify(
		myBreadLexicon,
		bread3d
	);
	let newHydration = bread.setHydration(0.6);
	expect(newHydration).toBe(0.6);
	expect(bread.valueOf()).toEqual(bread3e);

	bread = Mixture.mixturify(
		myBreadLexicon,
		bread4
	);
	newHydration = bread.setHydration(0.525);
	expect(newHydration).toBe(0.525);
	expect(bread.valueOf()).toEqual(bread4b);

	bread = Mixture.mixturify(
		myBreadLexicon,
		bread4b
	);
	newHydration = bread.setHydration(0.005);
	expect(newHydration).toBe(0.125); // cannot go lower than this!
	expect(bread.valueOf()).toEqual(bread4c);

	bread = Mixture.mixturify(
		myBreadLexicon,
		bread4c
	);
	newHydration = bread.setHydration(0.5);
	expect(newHydration).toBe(0.5);
	expect(bread.valueOf()).toEqual(bread4d);
});

test('FLMixture setHydration() throws errors correctly', () => {
	const bread = Mixture.mixturify(
		myBreadLexicon,
		bread4d
	);

	const bread2 = Mixture.mixturify(
		myBreadLexicon,
		bread4e
	);

	expect(
		() => {
			bread.setHydration(1/0)
		}
	).toThrow(
		new Error('cannot calculate with infinite h: Infinity')
	);

	expect(
		() => {
			bread.setHydration(NaN)
		}
	).toThrow(
		new Error('cannot calculate with infinite h: NaN')
	);

	expect(
		() => {
			bread.setHydration(-0.1)
		}
	).toThrow(
		new Error('no such thing as a negative hydration; h: -0.1')
	);

	expect(
		() => {
			bread2.setHydration(.5)
		}
	).toThrow(
		new Error('add some Liquid ingredients first')
	);
});