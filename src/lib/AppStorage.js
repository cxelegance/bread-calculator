/**
 * Responsible for creating a new AppStorage.
 *
 * @class
 * @classdesc A storage interface for creating and reading Bread Calculator ingredients.
 * @see Ingredient
 * @see Mixture
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
 */
class AppStorage {
	/** @type {String}  */
	namespace;

	/** @type {String}  */
	lsItemName;

	/** @type {String}  */
	lsIDName;

	/**
	 * @param {String} [lsItemName='nextId']   A namespace for using localStorage
	 * @param {String} [lsIDName='ingredient'] App ingredients will be stored under this identifier.
	 * @param {String} [namespace='']          The next record ID will be stored under this identifier.
	 */
	constructor(lsItemName='nextId', lsIDName='ingredient', namespace = ''){
		this.namespace = namespace.length ? `.${namespace}` : '';
		this.lsItemName = lsItemName;
		this.lsIDName = lsIDName;
	}

	/**
	 * Responsible for setting ingredients in storage.
	 *
	 * @see Ingredient
	 * @see Mixture
	 *
	 * @param {Object[]} ingredients An array of Ingredient or Mixture objects.
	 *
	 * @return {Object[]} An array of objects or an empty array.
	 */
	setIngredients(ingredients){
		window.localStorage.setItem(this.lsItemName + this.namespace, JSON.stringify(ingredients));
		return this.getIngredients();
	}

	/**
	 * Responsible for getting all ingredients in storage.
	 *
	 * @return {Object[]} An array of objects or an empty array.
	 */
	getIngredients(){
		const ingredients = JSON.parse( window.localStorage.getItem(this.lsItemName + this.namespace) ) || [];
		return ingredients;
	}

	/**
	 * Responsible for storing the next unique ID for ingredients.
	 *
	 * @param {(Number|Number[])} id A unique ID for an ingredient record, or an array of existing IDs
	 *
	 * @return {Number}              The next unique ID; IDs are positive integers.
	 */
	setNextId(id){
		if(typeof id == 'number'){
			window.localStorage.setItem(this.lsIDName + this.namespace, JSON.stringify(id));
			return id;
		}else if(!Array.isArray(id)){
			throw new TypeError('id must be Number or Number[]');
		}else if(id.length === 0){
			window.localStorage.setItem(this.lsIDName + this.namespace, JSON.stringify(0));
			return 0;
		}else if(id.length > 0){
			let nextId = id.reduce(
				(ignore, val) => {
					if(typeof val != 'number') throw new TypeError('id must be Number or Number[]');
					return Math.max(nextId || 0, val);
				},
				0
			);
			window.localStorage.setItem(this.lsIDName + this.namespace, JSON.stringify(++nextId));
			return nextId;
		}
	}

	/**
	 * Responsible for retrieving the next unique ID to be used for a new ingredient.
	 *
	 * @return {Number} The next ID.
	 */
	getNextId(){
		const nextId = JSON.parse(window.localStorage.getItem(this.lsIDName + this.namespace)) || 0;
		this.setNextId(nextId + 1);
		return nextId;
	}

}

export {AppStorage as default};