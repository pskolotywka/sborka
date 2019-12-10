const path = require('path');                         // Модуль позволяющий получить абсолютный путь из относительного
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'    // название папки в которую будет ложиться js
};

module.exports = {

    externals: {
        paths: PATHS
    },

    entry: PATHS.src,                       // Устанавливаем входящий файл для Js*a, который будем брать в "компилирование"                                                                                    ---стало
    output: {                                       // Устанавливаем исходный:
        /* path: './dist', */                       // Путь ---был путь относительный
        /* path: path.resolve(__dirname, './dist'), */    // Путь ---стал путь абсолютный
        path: PATHS.dist,
        /* filename: 'main.js', */                        // Название
        filename: `${PATHS.assets}js/[name].js`,  // здесь используем название папки для Js о котором писали выше в обьекте PATHS
        publicPath: '/',                        // Здесь указываем путь на который будет ссылаться браузер при разработке, то есть здесь будет лежать index.hmtl файл    
    },
// Всё написаное выше, это стандартные настройки вебпака, написали мы это здесь за тем что бы мы могли 
// это редактировать и менять директирории в случае необходимости.
    module: {                                       // Модуль по обработки js файлов
        rules: [
            {
                test: /\.js$/,                      // Регулярное выражение указывающее на "Все вайфлы с окончанием .js"
                loader: 'babel-loader',             // Здесь мы пишем что прогоняем все файлы js через babel
                exclude: '/node-modules/'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,                      
                loader: 'file-loader',    
                options: {
                    name: '[name].[ext]'
                }         
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,                      
                loader: 'file-loader',    
                options: {
                    name: '[name].[ext]'
                }         
            }
        ]
    },
    module: {                                       // Модуль по обработки css-scss файлов  
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: `${PATHS.src}/js/postcss.config.js` }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: `${PATHS.src}/js/postcss.config.js` }
                        }
                    },
                ]
            }, {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true,
                }
            }
        ],
    },
    plugins: [                                       // Здесь мы создаём output файл css в которой будет компилироваться код с scss и css, что описна выше.
        new MiniCssExtractPlugin({
          filename: `${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin({                          // Здесь мы копируем html файлы, всё тем же способом как и ниже
            hash: false,
            /* template: `${PATHS.src}/index.pug`, */          // Если будем работать на pug
            template: `${PATHS.src}/index.html`,   // Если будем работать на html
            filename: './index.html'
        }),
        new CopyWebpackPlugin([                       // Данным плагином копируем файлы с папки src в папку dist при команде build
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },    // Здесь берём все картинки с папки img, и копируем их в папку assets в dist
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: '' }                     // Здесь берём все файлы с папки static, и копируем их в нужную папку
        ]),
      ],
};