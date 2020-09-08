import Ingredient from '../../lib/Ingredient';

test('Ingredient cannot be instantiated: abstract class', () => {
	expect(
		() => new Ingredient('my Ingredient', 20)
	).toThrowError(new Error(`Ingredient is an abstract class and must be extended`));
});