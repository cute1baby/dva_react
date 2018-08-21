let ENV = process.env.ENV || "prod";

export default {
  entry: "src/index.js",
  hash: true,
  proxy: {
    "/api": {
      target: "http://10.0.2.231:3333/mock/133/api", //mock server
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    }
  },
  define: {
    __ENV__: ENV
  },
  extraBabelPlugins: [
    "transform-runtime",
    "transform-decorators-legacy",
    ["import", {libraryName: "antd", style: true}]
  ],
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"]
    },
    production: {
      extraBabelIncludes: []
    }
  }
}

