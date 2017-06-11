/**
 * Created by Administrator on 2017/6/11 0011.
 */
var path=require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={

    entry: './index.js',
    output:{
        path: path.resolve(__dirname),
        filename:'bundle.js'
    },
    module: {
        loaders:[
            {
                test:/.\css$/,
                loaders:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html',
            title:'use plugin'
        })
    ]
}