/**
 * Stubs out console.log for production environment.
 *
 * @module
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/console}
 */
if(window.console === null || typeof window.console !== 'object'){
	window.console = {};
}
if(process.env.NODE_ENV === 'production' || typeof window.console.log != 'function'){
	window.console.log('stubbing out console.log()');
	window.console.log = s => {}; // stub it out
}