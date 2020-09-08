import React from 'react';

/** @module */

const pJSON = require('../../package.json');

/**
 * Responsible for rendering a Header component.
 * @function
 *
 * @return {Object}
 */
export const Header = () => (
	<div>
		<h1 className="top-header">
			Bread Calculator
		</h1>
		<h6 className="top-header top-header--CXElegance">
			v<span>{pJSON.version}</span> by <a href="http://github.com/cxelegance">CXElegance</a>
		</h6>
	</div>
);

export default Header;