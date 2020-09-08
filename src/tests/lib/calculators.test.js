import {twoDecimal, zeroOrNumber} from '../../lib/calculators';

const zero = '0.00';

test('twoDecimal handles 0 correctly', () => {
	expect(twoDecimal(0)).toBe(zero);
	expect(twoDecimal(-0)).toBe(zero);
	expect(twoDecimal(+0)).toBe(zero);
	expect(twoDecimal('0')).toBe(zero);
	expect(twoDecimal('-0')).toBe(zero);
	expect(twoDecimal('+0')).toBe(zero);
	expect(twoDecimal(0.00)).toBe(zero);
	expect(twoDecimal(0.000000)).toBe(zero);
});

test('zeroOrNumber handles 0 correctly', () => {
	expect(zeroOrNumber(0)).toBe(0);
	expect(zeroOrNumber(-0)).toBe(0);
	expect(zeroOrNumber(+0)).toBe(0);
	expect(zeroOrNumber('0')).toBe(0);
	expect(zeroOrNumber('-0')).toBe(0);
	expect(zeroOrNumber('+0')).toBe(0);
	expect(zeroOrNumber(0.00)).toBe(0);
	expect(zeroOrNumber(0.000000)).toBe(0);
});

test('twoDecimal handles infinity and NaN correctly', () => {
	expect(twoDecimal(NaN)).toBe(zero);
	expect(twoDecimal(Infinity)).toBe(zero);
	expect(twoDecimal(1/0)).toBe(zero);
	expect(twoDecimal(2 * 'a')).toBe(zero);
	expect(twoDecimal('b' * 1)).toBe(zero);
	expect(twoDecimal(2 * '1')).toBe('2.00');
	expect(twoDecimal('2' * 1)).toBe('2.00');
	expect(twoDecimal('1')).toBe(zero);
	expect(twoDecimal('2')).toBe(zero);
});

test('zeroOrNumber handles infinity and NaN correctly', () => {
	expect(zeroOrNumber(NaN)).toBe(0);
	expect(zeroOrNumber(Infinity)).toBe(0);
	expect(zeroOrNumber(1/0)).toBe(0);
	expect(zeroOrNumber(2 * 'a')).toBe(0);
	expect(zeroOrNumber('b' * 1)).toBe(0);
	expect(zeroOrNumber(2 * '1')).toBe(2);
	expect(zeroOrNumber('2' * 1)).toBe(2);
	expect(zeroOrNumber('1')).toBe(0);
	expect(zeroOrNumber('2')).toBe(0);
});

test('twoDecimal handles rounding as expected', () => {
	expect(twoDecimal(0.004)).toBe(zero);
	expect(twoDecimal(0.005)).toBe('0.01');
	expect(twoDecimal(0.009)).toBe('0.01');
	expect(twoDecimal(0.554)).toBe('0.55');
	expect(twoDecimal(0.555)).toBe('0.56');
	expect(twoDecimal(0.556)).toBe('0.56');
	expect(twoDecimal(9.556)).toBe('9.56');
	expect(twoDecimal(9.559)).toBe('9.56');
	expect(twoDecimal(9.564)).toBe('9.56');
});