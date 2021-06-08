const webpack = require('webpack');
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

import Version from './src/util/Version.js';

//每次打包后动态修改build
function changeVersionFile() {
	//console.log(Version);
	Version.BUILD++;
	var newBody = `export default {VERSION : '${ Version.VERSION }',BUILD : ${ Version.BUILD }};`;
	fs.writeFile('./src/util/Version.js', newBody, (err) => {
		if (err) throw err;
		console.log('It\'s changed!BUILD:' + Version.BUILD);
	});
	return newBody;
}


module.exports = function(env, argv) {
	let entry = `./src/entry/${ env }.js`;

	if (env === 'map') changeVersionFile();

	let buildName = env;
	let buildMinName = buildName + '.min';

	return [
		{
			entry: {
				[buildName]: entry,
				[buildMinName]: entry,
			},
			output: {
				path: path.resolve(__dirname, "dist"),
				// path: "D:\\workhome\\FengMap_JSSDK_v30\\bin\\dist",
				filename: '[name].js',
				library: "ol",
				libraryTarget: 'umd',
				libraryExport: 'default',
				globalObject: 'this'
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: 'babel-loader'
					}
				]
			},
			plugins: [
				new CleanWebpackPlugin({ //匹配删除的文件
					verbose: true, //是否启用控制台输出信息
					dry: true //设置为false,启用删除文件
				})
			],
			resolve: {
				// 设置别名
				alias: {
					'@': path.resolve(__dirname, 'src')
				}
			},
			optimization: {
				minimize: true,
				minimizer: [
					new UglifyJsPlugin({
						include: /\.min/,
						extractComments: {
							condition: 'some',
							banner(licenseFile) {
								return ``;
							},
						},
						uglifyOptions: {
							output: {
								comments: false,
							},
							mangle: {
								toplevel: true,
								properties: {
									regex: /^_/ //压缩所有以下划线开头的变量、属性及方法名
								}
							},
							ascii: true,
							compress: {
								collapse_vars: true,
								reduce_vars: true,
								pure_funcs: ['console.log'] //移除console
							}
						}
					})
				]
			},
			node: {
				fs: 'empty'
			},
			externals: [{
                child_process:'child_process',
                fs:'fs',
                Buffer:'Buffer'
				// xmlhttprequest:'{XMLHttpRequest:XMLHttpRequest}'
				// XMLHttpRequest: '{XMLHttpRequest:XMLHttpRequest}'
            }]
		}
	]
}
