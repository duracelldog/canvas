const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// webpack 설명 https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d

module.exports = {
    mode: 'production', // development | production | none : process.env.NODE_ENV 값을 설정한다.
    entry: { // 웹팩이 파일을 읽어들이기 시작하는 부분
        index: ["./src/index.ts", "./src/index.scss"]
    },
    output: { // 결과물이 어떻게 나올지를 설정하는 부분
        // path: path.resolve(__dirname, './dist'),
        filename: '[name].js', // name이란 entry에서 설정한 이름을 그대로 넣어주고, hash는 컴파일할 때 마다, chunkhash란 수정사항이(파일이 달라질떄) 발생할때마다 랜덤문자열을 넣어 캐시가 남아있어 업데이트가 되지 않다거나 하는 문제를 없앤다.
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            { // babel-loader
                test: /\.(ts|js)$/,
                loader: 'babel-loader',
                options: {
                    plugins: ['@babel/plugin-syntax-dynamic-import'], // 코드스플리팅
                    presets: [
                        [
                            '@babel/preset-env', { // 브라우저에 필요한 ecmascript 버전을 자동으로 파악해서 알아서 polyfill을 넣어줍니다. 
                                targets: { // 지원하길 원하는 환경
                                    ie: '11',
                                    chrome: '58'
                                },
                                modules: false, // ES2015 모듈 시스템에서 import되지 않은 export들을 정리해주는 기능. (import하고 사용하지 않는 모듈 제거)
                                // useBuiltIns: 'usage' // entry|usage|false, 'usage'는 알아서 사용코드를 파악하여 폴리필을 import해줍니다. entry 파일 최상단에 import문을 적을 필요가 없습니다. false는 entry 최상단에 넣은 import문을 그냥 그대로 사용합니다. 즉 환경에 따라 polyfill을 다르게 적용하지 않는 것입니다.
                            }
                        ],
                        '@babel/preset-typescript'
                    ],
                    exclude: ['/node_modules']
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'sass-loader'
                ]
            },
            // { // css-loader는 css 파일들을 읽어주고 style-loader는 읽은 css 파일들을 style 태그로 만들어 head 태그 안에 넣어줍니다.
            //     test: /\.s[ac]ss$/i,
            //     use: ['style-loader', 'css-loader', 'sass-loader'], // 여러 개의 로더를 동시에 사용할 때는 use를 사용, 뒤에서 부터 처리 style-loader을 제일 마지막으로 처리
            // },
            { // 설정한 사이즈보다 작은 이미지나 폰트 파일을 인라인화 합니다.
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: '[hash].[ext]',
                    limit: 10*1024 // 10kb
                }
            },
            { // html
                test: /\.html/, 
                use: {
                    loader: 'html-loader', 
                    options: {minimize: true}
                } 
            },
        ]
    },
    
    plugins: [ // 약간 부가적인 기능 - 압축을 한다거나, 핫리로딩을 한다거나, 파일을 복사하는 등 부수적인 작업
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' })
        // new HtmlWebPackPlugin({ // webpack으로 번들된 js파일을 자동으로 html파일에 넣어준다.
        //     template: './src/index.html',
        //     filename: './dist/index.html',
        //     showErrors: true
        // })
    ],
    optimization: { // 웹팩4에서 최적화 관련 플러그인들이 모두 이쪽 속성으로 통합되었습니다.
        minimize: true,
        splitChunks: {}, // 중복되는 모듈을 제거
        // concatenateModules: true
    },
    resolve: { // 웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션
        modules: ['node_modules'],
        extensions: ['.ts', '.scss']
    },

    devtool: 'source-map', // source-map | eval-source-map | hidden-source-map  SourceMaps을 생성할지 말지 디버깅시 필요한 파일 생성d
}

// babel : javascript 컴파일러 : 인터프리터 언어이지만, 급변하는 최신 문법을 대응하기 위해 필요하다.
// babel-polyfill : babel을 통해 컴파일된 결과또한 최신 문법이 일부 포함된다.(promise, map, set, find, assign 같은 es5문법) 최종적으로 구형 문법으로 다시 한번 변환해 주는 부분.
// 인터프리터 : javascript가 대표적 예, 소스코드를 한줄 한줄 읽어들이면서 번역하는 방식.
// 컴파일러 : java, 소스코드를 한번에 기계어로 번역한다.
// 폴리필 : 특정 기능이 지원되지 않는 브라우저를 위해 사용할 수 있는 "코드조각" 또는 "플러그인".
// eval : 문자열을 코드로 인식하게 하는 것, '2+2' 문자열을 eval 함수를 거치면 4가 출력된다. https://www.codingfactory.net/11024
// 트리 쉐이킹 : 자바스크립트 컨텍스트에서 데드 코드(사용되지 않는 코드) 제거를 가리킬 때 일반적으로 사용되는 용어
// 핫리로딩 : 코드를 수정한 부분만 리로딩이 되며, 나머지 리스트는 그대로 유지된다. (상태를 잃어버리지 않고 데이터를 유지하게 된다.)