import StarterLexicon from '../../lib/StarterLexicon';
import Flour from '../../lib/Flour';
import Liquid from '../../lib/Liquid';

const myStarterLexicon = new StarterLexicon();
const MyFlourClass = myStarterLexicon.get('Flour');
const myFlour = new MyFlourClass();
const MyLiquidClass = myStarterLexicon.get('Liquid');
const myLiquid = new MyLiquidClass();

describe('StarterLexicon classes behave as expected', () => {

	test('StarterLexicon map has its props', () => {
		expect(myStarterLexicon.get('Flour') === Flour).toBe(true);
		expect(myStarterLexicon.get('Liquid') === Liquid).toBe(true);
	});

	test('can instantiate the StarterLexicon classes via its props', ()=>{
		expect(myFlour instanceof Flour).toBe(true);
		expect(myLiquid instanceof Liquid).toBe(true);
	});

});
