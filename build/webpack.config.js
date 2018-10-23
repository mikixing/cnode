require('colors');


const ENV 					= process.env.NODE_ENV;
const glob					= require('glob');
const path 					= require('path');
const webpack 				= require('webpack');
const HtmlWebpackPlugin 	= require('html-webpack-plugin');
const CopyWebpackPlugin 	= require('copy-webpack-plugin');
const ExtractTextPlugin 	= require('extract-text-webpack-plugin');

const isProduction 			= ENV === 'production';

const resolve = (...args) => {
	return path.join(__dirname, '..', ...args);
}


const entry = {
	main: resolve('src/main.js')
}
const plugins = [
	new ExtractTextPlugin('style.css?[hash:7]'),
	new HtmlWebpackPlugin({  // 相对于 out.path
		template: resolve('src/index.html'),
		inject: true
	})
]

module.exports = {
	entry,
	module: {
		rules: [{
				test: /\.vue$/, use: 'vue-loader'
			}, {
				test: /\.js$/, use: 'babel-loader'
			}, {
				 test: /\.css$/,
	                use:ExtractTextPlugin.extract({
	                    fallback:"style-loader",
	                    use:"css-loader"
	                })
			}, 
			{
				test: /\.scss$/,
	                use:ExtractTextPlugin.extract({
	                    fallback:"style-loader",
	                    use:[{
	                        loader:"css-loader"
	                    },{
	                        loader:"sass-loader"
	                    }]
	                })
	        }, {
	        	 test: /\.less$/,
	                use:ExtractTextPlugin.extract({
	                    fallback:"style-loader",
	                    use:[{
	                        loader:"css-loader"
	                    },{
	                        loader:"less-loader"
	                    }]
	                })
	        }, {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join(__dirname, '../dist/img/[name].[hash:7].[ext]')
				}
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join(__dirname, '../dist/fonts/[name].[hash:7].[ext]')
				}}
	]},
	resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
	plugins,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js?[hash:7]',
		publicPath:'/'
	},
	devServer: {
		contentBase: resolve('dist'),
		compress: true,
		hot: true,
		host: '0.0.0.0',
		port: 9090
	}
}

