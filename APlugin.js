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
    //获取被直接影响的模块
    let diffModules = modules.filter(singleModule => absDiffFiles.some(s => s === singleModule.resource))
    return diffModules
    // function B(mo, abspaths,arr) {
    //     let tmpArr = []
    //     if (mo.dependencies && mo.dependencies.length) {
    //         mo.dependencies.foreach((subModule) => {
    //             let res = B(subModule, abspaths)
    //             if (res && res.length > 0) {
    //                 arr = arr.concat(res)
    //                 tmpArr.push(arr)
    //             }
    //         })
    //         if (tmpArr.length === 0) {
    //             return []
    //         }
    //     }
    //     return tmpArr
    // }
    // B(diffModules, absDiffFiles, [])

}
class APlugin {
    apply(compiler) {
        //临时的实现
        global.pathMap = new Map()
        // compiler.hooks.normalModuleFactory.tap(pluginName, (factory) => {
        //     factory.hooks.parser.for('javascript/auto').tap(pluginName, (parser, options) => {
        //         parser.hooks.program.tap(pluginName, (ast, comment) => {
        //             // console.log(comment)
        //         })
        //     });
        // })
        compiler.hooks.compilation.tap(pluginName, compilation => {
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