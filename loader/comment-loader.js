//暂存文件路径和模块名称的映射

const loaderUtils = require('loader-utils')
module.exports = function (content, map, meta) {
    //忽略由其他loader生成的子模块，例如一个vue文件会由vue-loader会产生三个子模块对应script、html和style
    if (!this.resourceQuery) {
        var reg = /^\/\*\*([\w\W]+)\*\/[\n\r]/
        var res = reg.exec(content)
        let ops = loaderUtils.getOptions(this)
        if (res && res.length === 2) {
            global.pathMap.set(`${this._module.resource}`, res[1].trim())
            console.log(global.pathMap)
            return content.replace(reg, '')
        }
    }
    return content
};