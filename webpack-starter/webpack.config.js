const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	
	entry: __dirname + "/app/main.js",
	output: {
		path: __dirname + "/build",
		filename: "bundle.js"
	},
	/**使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项； */
	devtool: 'eval-source-map',//使用eval-source-map
	devServer: {
		contentBase: "./public",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    port: "8081",//指定端口
	    inline: true//实时刷新
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",					
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					}, {
						loader: "css-loader",
						options: {
							modules: true
						}
					}, {
						loader: "postcss-loader"
					}
				]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('Copyright PXJ 2017'),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
		}),
		new webpack.HotModuleReplacementPlugin() //热加载插件
	]
}