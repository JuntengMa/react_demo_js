const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addPostcssPlugins
} = require("customize-cra");


const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const CompressionWebpackPlugin = require("compression-webpack-plugin");


// production
const isEnvProduction = process.env.NODE_ENV === "development";

//测时长
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

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

module.exports = override(

  fixBabelImports("import",
    {
      libraryName: "antd",
      libraryDirectory: "es",
      // 若修改antd主题，"css"需改为true
      style: "css"
    }
  ),
  // 移动端适配，px转rem 需要安装postcss - pxtorem
  addPostcssPlugins([
    require("postcss-pxtorem")({
      // rem 转换基数
      rootValue: 16,
      // 保留五位小数点
      unitPrecision: 5,
      // 所有属性都转换
      propList: ["*"],
      // 低于2px不转换
      minPixelValue: 2,
      // 排除antd样式
      selectorBlackList: [/^\.ant-/, "html"]
    })
  ]),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),

  addCompression(),

  addAnalyzer(),

  addWebpackPlugin(
    new ProgressBarPlugin(),
  ),


)
