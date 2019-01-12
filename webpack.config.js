const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const path = require('path')

module.exports = (options) => {
    const env = require('./env/' + options.config + '.js')
    const plugin = require('./env/pro.js').plugin
    const port = env.port || 5555
    const buildDir = 'dist'
    const isLocal = options.local
    const editorLibs = []
    const minify = {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true, // 删除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除script上的type
        removeStyleLinkTypeAttributes: true // 删除style上的type
    }

    // 如果是本地开发，使用未压缩的插件
    if (isLocal) {
        for (let key in plugin) {
            plugin[key] = plugin[key].replace('.min', '')
        }
    }
    for (let key in plugin) {
        editorLibs.push({
            url: plugin[key],
            isAsync: false
        })
    }


    const rules = [
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        // {
        //     test: /\.js$/,
        //     exclude: /node_modules/,
        //     use: 'babel-loader'
        // },
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif|svg|ico)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    limit: 1000
                }
            }]
        }
    ]

    const plugins = [
        new CleanWebpackPlugin(buildDir, {
            root: __dirname // 需要指定根目录，才能删除项目外的文件夹
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify,
            libs: editorLibs,
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, buildDir)
        })
    ]

    return {
        mode: isLocal ? 'development' : 'production',
        entry: {
            app: [
                './src'
            ]
        },
        output: {
            publicPath: '//' + env.host.cdn + (options.hot ? ':' + port : '') + '/vue-colorpicker/',
            path: path.resolve(__dirname, buildDir),
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js' // 本地开发如果使用hash，watch会影响到公用js
        },
        module: {
            rules
        },
        plugins,
        resolve: {
            alias: {
                env: path.resolve(__dirname, 'env/' + options.config + '.js'),
                src: path.resolve(__dirname, 'src')
            }
        },
        externals: {
            'vue': 'Vue'
        },
        devtool: options.pro ? false : 'source-map',
        devServer: {
            hot: true,
            host: env.host.cdn,
            port,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
}
