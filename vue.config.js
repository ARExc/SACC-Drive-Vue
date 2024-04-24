const {defineConfig} = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            fallback: {
                "process": require.resolve("process/browser"),
                "buffer": require.resolve("buffer/"),
                "stream": require.resolve("stream-browserify"),
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],  // 提供全局的 Buffer 变量
                process: 'process/browser'  // 提供全局的 process 变量
            }),
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
            }),
            new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
                resource.request = resource.request.replace(/^node:/, "");
            }),//这个很关键
        ],
    }
});
