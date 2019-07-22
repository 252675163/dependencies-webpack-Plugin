const pluginName = 'APlugin';
var path = require('path')
//改动的文件
let diffFiles = ['/src/D.vue']
let absDiffFiles = diffFiles.map(file => path.join(__dirname, file))
console.log(__dirname)
/**
 * 
 * @param {*} absDiffFiles 
 * @param {*} modules 
 */
function compareAbsPath(diffModules,deptree) {  
/**
 * 递归写法
 * 
 */
    if(diffModules.resource.indexOf('?')===-1){
        deptree.push(diffModules.resource)
    }   
    if(diffModules.reasons[0].module==null){
        return deptree;
    }else{
        return compareAbsPath(diffModules.reasons[0].module,deptree)
    }          
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
                    let diffModules = modules.filter(singleModule => absDiffFiles.some(s => s === singleModule.resource))
                    diffModules = compareAbsPath(diffModules[0],[]) 
                    diffModules.map(value=>{
                        console.log(value);                        
                    })               
                });
            }

        });
    }
}
module.exports = APlugin
