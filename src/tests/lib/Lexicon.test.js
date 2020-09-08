import Lexicon from '../../lib/Lexicon';

test('Lexicon cannot be instantiated: abstract class', () => {
	expect(
		() => new Lexicon()
	).toThrowError(new Error(`Lexicon is an abstract class and must be extended`));
});