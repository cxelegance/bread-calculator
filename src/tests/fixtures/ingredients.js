/**
 * @module
 */

/*
 * The app state is an array of Ingredients or Mixtures in valueOf() format.
 */

import {twoDecimal} from '../../lib/calculators';

/**
 * An example of an app state representing bread ingredients.
 *
 * @type {Object[]}
 * @see bread1
 */
export const stateBread1 = [
	{
		id: 0,
		type: 'Starter',
		data: {
			weight: 54,
			description: 'starter all white',
			hydration: 1,
			ingredients: [
				{
					type: 'Flour',
					data: {
						description: 'white flour',
						weight: 27
					}
				},
				{
					type: 'Liquid',
					data: {
						description: 'water',
						weight: 27
					}
				}
			]
		}
	},
	{
		id: 1,
		type: 'Flour',
		data: {
			description: 'white flour',
			weight: 100
		}
	},
	{
		id: 2,
		type: 'Liquid',
		data: {
			description: 'water',
			weight: 70
		}
	},
	{
		id: 3,
		type: 'Salt',
		data: {
			description: '',
			weight: 4
		}
	}
];

/**
 * An example of an app state representing bread ingredients, but with calculations added.
 *
 * @type {Object[]}
 * @see bread1
 * @see stateBread1
 */
export const stateCalcsBread1 = [
	{
		id: 0,
		type: 'Starter',
		calcs: {
			contributionFlours: twoDecimal(54 / 127),
			contributionTotal: twoDecimal(54 / 228),
			contributionLiquids: twoDecimal(54 / 97)
		},
		data: {
			weight: 54,
			description: 'starter all white',
			hydration: 1,
			ingredients: [
				{
					type: 'Flour',
					calcs: {
						contributionFlours: twoDecimal(27 / 127),
						contributionTotal: twoDecimal(27 / 228),
						contributionLiquids: twoDecimal(27 / 97)
					},
					data: {
						description: 'white flour',
						weight: 27
					}
				},
				{
					type: 'Liquid',
					calcs: {
						contributionFlours: twoDecimal(27 / 127),
						contributionTotal: twoDecimal(27 / 228),
						contributionLiquids: twoDecimal(27 / 97)
					},
					data: {
						description: 'water',
						weight: 27
					}
				}
			]
		}
	},
	{
		id: 1,
		type: 'Flour',
		calcs: {
			contributionFlours: twoDecimal(100 / 127),
			contributionTotal: twoDecimal(100 / 228),
			contributionLiquids: twoDecimal(100 / 97)
		},
		data: {
			description: 'white flour',
			weight: 100
		}
	},
	{
		id: 2,
		type: 'Liquid',
		calcs: {
			contributionFlours: twoDecimal(70 / 127),
			contributionTotal: twoDecimal(70 / 228),
			contributionLiquids: twoDecimal(70 / 97)
		},
		data: {
			description: 'water',
			weight: 70
		}
	},
	{
		id: 3,
		type: 'Salt',
		calcs: {
			contributionFlours: twoDecimal(4 / 127),
			contributionTotal: twoDecimal(4 / 228),
			contributionLiquids: twoDecimal(4 / 97)
		},
		data: {
			description: '',
			weight: 4
		}
	}
];

/**
 * An example of a valueOf() coming from a Bread instance that includes Fat.
 *
 * @type {Object[]}
 * @see bread2
 */
export const bread2ValueOf = [
	{
		type: 'Starter',
		data: {
			weight: 54,
			description: 'starter all white',
			hydration: 1,
			ingredients: [
				{
					type: 'Flour',
					data: {
						description: 'white flour',
						weight: 27
					}
				},
				{
					type: 'Liquid',
					data: {
						description: 'water',
						weight: 27
					}
				}
			]
		}
	},
	{
		type: 'Flour',
		data: {
			description: 'white flour',
			weight: 100
		}
	},
	{
		type: 'Liquid',
		data: {
			description: 'water',
			weight: 70
		}
	},
	{
		type: 'Salt',
		data: {
			description: 'sea salt',
			weight: 4
		}
	},
	{
		type: 'Fat',
		data: {
			description: 'olive oil',
			weight: 4
		}
	},
	{
		type: 'Starter',
		data: {
			weight: 2,
			description: 'levain',
			hydration: 1,
			ingredients: [
				{
					type: 'Flour',
					data: {
						description: 'whole wheat flour',
						weight: 1
					}
				},
				{
					type: 'Liquid',
					data: {
						description: 'water',
						weight: 1
					}
				}
			]
		}
	}
];

/**
 * A new Ingredient in valueOf() format.
 *
 * @type {Object}
 */
export const newIngredient = {
	id: 5, type: 'Liquid', data: {
		description: 'milk',
		weight: 1
	}
};

/*
 *
 * For the Ingredient and Mixture classes and their subclasses:
 *
 */

export const flour1 = {
	type: 'Flour',
	data: {
		weight: 100,
		description: 'white flour'
	}
};

export const liquid1 = {
	type: 'Liquid',
	data: {
		weight: 70,
		description: 'water'
	}
};

export const starterFlour1 = {
	type: 'Flour',
	data: {
		weight: 27,
		description: 'white flour'
	}
};

export const starterFlour2 = {
	type: 'Flour',
	data: {
		weight: 3,
		description: 'whole wheat flour'
	}
};

export const starterLiquid1 = {
	type: 'Liquid',
	data: {
		weight: 27,
		description: 'water'
	}
};

export const starter1 = {
	type: 'Starter',
	data: {
		weight: 54,
		description: 'starter all white',
		hydration: 1,
		ingredients: [
			starterFlour1,
			starterLiquid1
		]
	}
};

export const starter2 = {
	type: 'Starter',
	data: {
		weight: 57,
		description: 'starter .9 white .1 whole wheat',
		hydration: 0.9,
		ingredients: [
			starterFlour1,
			starterFlour2,
			starterLiquid1
		]
	}
};

export const salt1 = {
	type: 'Salt',
	data: {
		weight: 4,
		description: ''
	}
};

export const salt2 = {
	type: 'Salt',
	data: {
		weight: 4,
		description: 'sea salt'
	}
};

export const fat1 = {
	type: 'Fat',
	data: {
		weight: 4,
		description: 'olive oil'
	}
};

/**
 * An example of a Bread instance that might be formed from app state ingredients.
 *
 * @type {Object}
 * @see stateBread1
 */
export const bread1 = {
	type: 'Bread',
	data: {
		weight: 228,
		description: 'ingredients transformed into bread',
		hydration: 0.7637795275590551,
		ingredients: [
			starter1,
			flour1,
			liquid1,
			salt1
		]
	},
};

/**
 * An example of a Bread instance that would not be found in app state due the presence of Fat.
 *
 * @type {Object}
 * @see bread2ValueOf
 */
export const bread2 = {
	type: 'Bread',
	data: {
		weight: 235,
		description: 'ingredients transformed into bread',
		hydration: 0.7461538461538462,
		ingredients: [
			starter2,
			flour1,
			liquid1,
			salt2,
			fat1
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general weight or hydration.
 *
 * @type {Object}
 */
export const bread3 = {
	type: 'Bread',
	data: {
		weight: 160,
		description: 'ingredients transformed into bread',
		hydration: 0.8, // this is correct: (8 + 56)/(10 + 70) = 0.8
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 18,
					description: 'starter all white',
					hydration: 0.8,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 10,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 8,
								description: 'water'
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 70,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 56,
					description: 'water'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 8,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 8,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general weight or hydration.
 *
 * @type {Object}
 * @see bread3 and increase it to 200 g
 */
export const bread3b = {
	type: 'Bread',
	data: {
		weight: 200, // to get from 160 to 200, multiply by 1.25
		description: 'ingredients transformed into bread',
		hydration: 0.8, // this is still correct: (10 + 70)/(12.5 + 87.5) = 0.8
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 22.5,
					description: 'starter all white',
					hydration: 0.8,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 12.5,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 10,
								description: 'water'
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 87.5,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 70,
					description: 'water'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 10,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 10,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general weight or hydration.
 *
 * @type {Object}
 * @see bread3b and decrease it to 100 g
 */
export const bread3c = {
	type: 'Bread',
	data: {
		weight: 100, // to get from 200 to 100, multiply by 0.5
		description: 'ingredients transformed into bread',
		hydration: 0.8, // this is still correct: (5 + 35)/(6.25 + 43.75) = 0.8
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 11.25,
					description: 'starter all white',
					hydration: 0.8,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 6.25,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 43.75,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 35,
					description: 'water'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general weight or hydration.
 *
 * @type {Object}
 * @see bread3c and increase hydration to 1.0
 */
export const bread3d = {
	type: 'Bread',
	data: {
		weight: 110,
		description: 'ingredients transformed into bread',
		hydration: 1.0, // go from 0.8 to 1.0 touching only Liquid ingredients
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 11.25,
					description: 'starter all white',
					hydration: 0.8,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 6.25,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 43.75,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 45,
					description: 'water'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general weight or hydration.
 *
 * @type {Object}
 * @see bread3e and decrease hydration to 0.6
 */
export const bread3e = {
	type: 'Bread',
	data: {
		weight: 90,
		description: 'ingredients transformed into bread',
		hydration: 0.6, // go from 1.0 to 0.6 by touching only Liquid ingredients
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 11.25,
					description: 'starter all white',
					hydration: 0.8,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 6.25,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 43.75,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 25,
					description: 'water'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general hydration; this one has deeper
 * Starter inside a starter plus extra Liquid in its root ingredients.
 *
 * @type {Object}
 */
export const bread4 = {
	type: 'Bread',
	data: {
		weight: 140,
		description: 'ingredients transformed into bread',
		hydration: 0.625,  // 50 / 80;  reduce to 42 / 80
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 30,
					description: 'starter all white',
					hydration: 0.5,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 12,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						},
						{
							type: 'Starter',
							data: {
								weight: 13,
								description: 'old starter',
								hydration: 0.625,
								ingredients: [
									{
										type: 'Flour',
										data: {
											weight: 8,
											description: 'white flour'
										}
									},
									{
										type: 'Liquid',
										data: {
											weight: 5,
											description: 'water'
										}
									}
								]
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 60,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 20, // .8 of this is 16
					description: 'water'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 20, // .8 of this is 16
					description: 'milk'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general hydration; this one has deeper
 * Starter inside a starter plus extra Liquid in its root ingredients.
 *
 * @type {Object}
 * @see bread4 and decrease hydration to 0.525
 */
export const bread4b = {
	type: 'Bread',
	data: {
		weight: 132,
		description: 'ingredients transformed into bread',
		hydration: 0.525,  // 50 / 80 = 0.625;  reduce to 42 / 80 = 0.525
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 30,
					description: 'starter all white',
					hydration: 0.5,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 12,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						},
						{
							type: 'Starter',
							data: {
								weight: 13,
								description: 'old starter',
								hydration: 0.625,
								ingredients: [
									{
										type: 'Flour',
										data: {
											weight: 8,
											description: 'white flour'
										}
									},
									{
										type: 'Liquid',
										data: {
											weight: 5,
											description: 'water'
										}
									}
								]
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 60,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 16, // .8 of 20 is 16
					description: 'water'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 16, // .8 of 20 is 16
					description: 'milk'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general hydration; this one has deeper
 * Starter inside a starter plus extra Liquid in its root ingredients.
 *
 * @type {Object}
 * @see bread4b and reduce all Liquids (except Mixture subingredients) to zero
 */
export const bread4c = {
	type: 'Bread',
	data: {
		weight: 100,
		description: 'ingredients transformed into bread',
		hydration: 0.125,  // 10 / 80 = 0.125;  try reducing to below 0.125—it cannot drop below that!
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 30,
					description: 'starter all white',
					hydration: 0.5,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 12,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						},
						{
							type: 'Starter',
							data: {
								weight: 13,
								description: 'old starter',
								hydration: 0.625,
								ingredients: [
									{
										type: 'Flour',
										data: {
											weight: 8,
											description: 'white flour'
										}
									},
									{
										type: 'Liquid',
										data: {
											weight: 5,
											description: 'water'
										}
									}
								]
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 60,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 0,
					description: 'water'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 0,
					description: 'milk'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general hydration; this one has deeper
 * Starter inside a starter plus extra Liquid in its root ingredients.
 *
 * @type {Object}
 * @see bread4c and increase hydration to 0.5
 */
export const bread4d = {
	type: 'Bread',
	data: {
		weight: 130,
		description: 'ingredients transformed into bread',
		hydration: 0.5,  // 40 / 80 = 0.5;
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 30,
					description: 'starter all white',
					hydration: 0.5,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 12,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						},
						{
							type: 'Starter',
							data: {
								weight: 13,
								description: 'old starter',
								hydration: 0.625,
								ingredients: [
									{
										type: 'Flour',
										data: {
											weight: 8,
											description: 'white flour'
										}
									},
									{
										type: 'Liquid',
										data: {
											weight: 5,
											description: 'water'
										}
									}
								]
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 60,
					description: 'white flour'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 15.000000000000002,
					description: 'water'
				}
			},
			{
				type: 'Liquid',
				data: {
					weight: 15.000000000000002,
					description: 'milk'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};

/**
 * Another example of a Bread instance that might be formed from app state ingredients, but
 * with easy weight calculations for manipulating general hydration; this one has deeper
 * Starter inside a starter plus extra Liquid in its root ingredients.
 *
 * @type {Object}
 * @see bread4d and completely remove all Liquids (except Mixture subingredients)
 */
export const bread4e = {
	type: 'Bread',
	data: {
		weight: 100,
		description: 'ingredients transformed into bread',
		hydration: 0.125,  // 10 / 80 = 0.125;  try reducing to below 0.125—it cannot drop below that!
		ingredients: [
			{
				type: 'Starter',
				data: {
					weight: 30,
					description: 'starter all white',
					hydration: 0.5,
					ingredients: [
						{
							type: 'Flour',
							data: {
								weight: 12,
								description: 'white flour'
							}
						},
						{
							type: 'Liquid',
							data: {
								weight: 5,
								description: 'water'
							}
						},
						{
							type: 'Starter',
							data: {
								weight: 13,
								description: 'old starter',
								hydration: 0.625,
								ingredients: [
									{
										type: 'Flour',
										data: {
											weight: 8,
											description: 'white flour'
										}
									},
									{
										type: 'Liquid',
										data: {
											weight: 5,
											description: 'water'
										}
									}
								]
							}
						}
					]
				}
			},
			{
				type: 'Flour',
				data: {
					weight: 60,
					description: 'white flour'
				}
			},
			{
				type: 'Salt',
				data: {
					weight: 5,
					description: 'water'
				}
			},
			{
				type: 'Fat',
				data: {
					weight: 5,
					description: 'water'
				}
			}
		]
	},
};