import {
	stateToBread, stateToBreadValue, breadToTotals, stateAddCalcs, breadToLiquids
} from '../../transformers/bread';
import {stateBread1, bread1, stateCalcsBread1, liquid1} from '../fixtures/ingredients';

let myBreadVal, myBread, myTotals;

test('stateToBreadValue transforms app state into a Bread value', () => {
	myBreadVal = stateToBreadValue(stateBread1);
	expect(myBreadVal).toEqual(bread1);
});

test('stateToBread transforms app state into a Bread instance', () => {
	myBread = stateToBread(stateBread1);
	expect(myBread.valueOf()).toEqual(bread1);
});

test('breadToLiquids transforms a Bread instance into an array of its Liquid ingredients', () => {
	myBread = stateToBread(stateBread1);
	const liquids = breadToLiquids(myBread);
	expect(liquids[0].valueOf()).toEqual(liquid1.valueOf());
});

test('breadToTotals exports the correct sums and values', () => {
	myTotals = breadToTotals(myBread);
	const {
		total, totalFlour, totalLiquid, totalSalt, totalFat, totalStarter, totalBread , hydration
	} = myTotals;
	expect(total).toBe(228);
	expect(totalFlour).toBe(127);
	expect(totalLiquid).toBe(97);
	expect(totalSalt).toBe(4);
	expect(totalStarter).toBe(54);
	expect(totalBread).toBe(0); // there are no breads in the bread
	expect(hydration).toBe(totalLiquid / totalFlour);
});

test('stateAddCalcs adds correct calculation properties', () => {
	const myCalcs = stateAddCalcs(stateBread1);
	expect(myCalcs).toEqual(stateCalcsBread1);
});
