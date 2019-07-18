const pluginName = 'APlugin';

class APlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
            /**不是'html-webpack-plugin'引起的入口 */
            if (!(compilation.name && compilation.name.includes('html-webpack-plugin'))) {
                compilation.hooks.finishModules.tap(pluginName, modules => {
                    console.log("finishModules");
                });
            }

        });
    }
}
module.exports = APlugin