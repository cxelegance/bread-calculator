import Starter from '../../lib/Starter';
import Flour from '../../lib/Flour';
import Liquid from '../../lib/Liquid';
import StarterLexicon from '../../lib/StarterLexicon';

const liquid = new Liquid('water', 10);
const starterLexicon = new StarterLexicon();
const starter = new Starter(starterLexicon, 'a test starter with no flour', [liquid]);

test('no flour starter has zero hydration', () => {
	expect(starter.getHydration()).toBe(0);
});