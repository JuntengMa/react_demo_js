const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addPostcssPlugins
} = require("customize-cra");

const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const CompressionWebpackPlugin = require("compression-webpack-plugin");

//优化压缩速度, 并行压缩
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

//加快打包速度
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

//测时长
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const addCompression = () => config => {
  if (isEnvProduction) {
    config.plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9
      })
    );
  }
  return config;
};

// 查看打包后各包大小
const addAnalyzer = () => config => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};

// production
const isEnvProduction = process.env.NODE_ENV === "development";

module.exports = smp.wrap(override(

  fixBabelImports("import",
    {
      libraryName: "antd",
      libraryDirectory: "es",
      // 若修改antd主题，"css"需改为true
      style: "css"
    }
  ),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),

  addCompression(),

  addAnalyzer(),

  addWebpackPlugin(
    new ProgressBarPlugin(),
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
          /*
           是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
           可以设置为false
          */
          beautify: false,
          /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          */
          comments: false
        },
        compress: {
          /*
           是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
           不大的警告
          */
          warnings: false,

          /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          */
          drop_console: true,

          /*
           是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false
          */
          collapse_vars: true,

          /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          */
          reduce_vars: true
        }
      }
    }),
    //start加速
    new CaseSensitivePathsPlugin()
  ),
))
