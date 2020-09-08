import React, {useEffect, useState} from 'react';
/** @module */

/**
 * Responsible for rendering a React-controlled input with a provided blur handler.
 * @function
 *
 * @param {Object} params All params that should go on the input tag, plus: blurvalue, blurhandler
 *
 * @return {Object}
 */
const BlurInput = (params) => {
	if(params.value !== undefined) throw new TypeError('BlurInput: value should not be defined; use blurvalue');
	if(params.onChange !== undefined) throw new TypeError('BlurInput: onChange should not be defined; use blurhandler');
	if(typeof params.blurvalue != 'string') throw new TypeError('BlurInput: blurvalue should be a defined string');
	if(typeof params.blurhandler != 'function') throw new TypeError('BlurInput: blurhandler should be a defined callback function');

	const [value, setValue] = useState(params.blurvalue);

	const attribs = { ...params };
	delete attribs.blurhandler;
	delete attribs.blurvalue;

	const handleBlur = e => {
		const received = params.blurhandler(e);
		if(typeof received != 'string') throw new TypeError('BlurInput: blurhandler should return the (reformatted) value as a string');
		setValue(received);
	};

	const handleChange = e => {
		setValue(e.target.value);
	}

	// componentDidMount and componentDidUnmount
	useEffect(
		() => {
			console.log(`componentDidMount: BlurInput: value: ${value}`);
			return () => {
				console.log(`componentDidUnmount: BlurInput`)
			}
		},
		[]
	);

	// componentDidUpdate: value
	useEffect(
		() => {
			console.log(`componentDidUpdate: BlurInput: value: ${value}`);
		},
		[value]
	);

	// componentDidUpdate: params
	useEffect(
		() => {
			console.log(`componentDidUpdate: BlurInput: params.blurvalue: ${params.blurvalue}`);
			setValue(params.blurvalue);
		},
		[params.blurvalue]
	);

	return (
		<input {...attribs} value={value} onChange={handleChange} onBlur={handleBlur} />
	);
};

export { BlurInput as default };