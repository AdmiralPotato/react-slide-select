var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './src/react-slide-select',
	output: {
		library: 'SlideSelect',
		libraryTarget: 'umd',
		path: path.join(__dirname, 'lib'),
		filename: 'react-slide-select.js'
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
