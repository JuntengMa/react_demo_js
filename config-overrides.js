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

// product环境开启gzip压缩
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

// 打包配置
const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    // 关闭sourceMap
    config.devtool = false;
    // 配置打包后的文件位置
    config.output.path = __dirname + '../dist/demo/';
    config.output.publicPath = './demo';
  }
  return config;
}

//跨域配置
const devServerConfig = () => config => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      '/api': {
        target: 'xxx',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      }
    }
  }
}

module.exports = override(

  addCustomize(),

  fixBabelImports("import",
    {
      libraryName: "antd",
      libraryDirectory: "es",
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
