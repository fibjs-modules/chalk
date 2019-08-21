// https://github.com/chalk/chalk/blob/v2.4.2/test/_supports-color.js

const resolveFrom = require('resolve-from');

module.exports = dir => {
	require.cache[resolveFrom(dir, 'supports-color')] = {
		exports: {
			stdout: {
				level: 3,
				hasBasic: true,
				has256: true,
				has16m: true
			}
		}
	};
};