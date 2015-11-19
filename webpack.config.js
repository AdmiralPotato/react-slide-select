var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		'lib/react-slide-select': './src/react-slide-select',
		'examples/examples': [
			'./examples/example-custom_children',
			'./examples/example-product',
			'./examples/example-hero'
		]
	},
	output: {
		library: 'SlideSelect',
		libraryTarget: 'umd',
		path: path.resolve(__dirname),
		filename: '[name].js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},
	externals: [{
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	}],
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
