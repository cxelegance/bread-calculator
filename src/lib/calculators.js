/** @module */

import numeral from 'numeral';

/**
 * Responsible for rounding a float value to two decimal points, representing as a string;
 * NaN or Infinity becomes zero; all rounding is to zero, e.g. 0.005 becomes '0.00'.
 * @function
 *
 * @param  {Number} val Any numerical value.
 *
 * @return {String}     The value wrapped in a string, rounded to two decimals.
 */
export const twoDecimal = val => (
	Number.isFinite(val) ? numeral(val).format('0.00') : '0.00'
);

/**
 * Responsible for mapping NaN or Infinity to zero while leaving other numbers as they are
 * provided.
 * @function
 *
 * @param  {*}      val Any value.
 *
 * @return {Number}
 */
export const zeroOrNumber = val => (
	Number.isFinite(val) ? numeral(val).value() : 0
);