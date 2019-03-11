module.exports = function (api) {
	api.cache(true);
	return {
		plugins: [
			'@babel/plugin-transform-modules-commonjs',
			'@babel/plugin-transform-async-to-generator',
			'@babel/plugin-transform-runtime',
			'@babel/plugin-proposal-object-rest-spread'
		]
	};
};
