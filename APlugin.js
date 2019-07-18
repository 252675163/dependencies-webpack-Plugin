const pluginName = 'APlugin';
var path = require('path')
//改动的文件
let diffFiles = ['/src/A1.js']
let absDiffFiles = diffFiles.map(file => path.join(__dirname, file))
console.log(__dirname)
/**
 * 
 * @param {*} absDiffFiles 
 * @param {*} modules 
 */
function compareAbsPath(absDiffFiles, modules) {
    return modules.filter(singleModule => absDiffFiles.some(s => s === singleModule.resource))
}
class APlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
            /**不是'html-webpack-plugin'引起的入口 */
            if (!(compilation.name && compilation.name.includes('html-webpack-plugin'))) {
                compilation.hooks.finishModules.tap(pluginName, modules => {
                    //直接改动的module
                    let diffModules = []
                    diffModules = compareAbsPath(absDiffFiles, modules)
                });
            }

        });
    }
}
module.exports = APlugin