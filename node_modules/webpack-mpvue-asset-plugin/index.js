function MpvuePlugin() {}

MpvuePlugin.prototype.apply = function(compiler) {
  const {options: {entry, plugins}} = compiler;
  compiler.plugin('emit', function(compilation, callback) {
    let commonsChunkNames = [];
    // 获取所有的 chunk name
    plugins.forEach(item => {
      let { chunkNames } = item;
      if (item.constructor.name === 'CommonsChunkPlugin' && chunkNames) {
        commonsChunkNames = commonsChunkNames.concat(chunkNames);
      }
    })
    let pages = Object.keys(entry);
    compilation.chunks.forEach(commonChunk => {
      const { files, chunks: childChunks, name } = commonChunk;
      let commonWxssFile = files.find(item => item.endsWith('.wxss'));
      
      if (commonsChunkNames.indexOf(name) > -1 && commonWxssFile) {
        childChunks.forEach(item => {
          let wxssFile = item.files.find(item => item.endsWith('.wxss'));
          if (item.name === 'app' && wxssFile) { // 过滤 app
            return;
          }
          try {
            if (compilation.assets[wxssFile]) {
              let wxss = compilation.assets[wxssFile].source();
              wxss = `@import "/${commonWxssFile}";\n${wxss}`;
              compilation.assets[wxssFile].source = () => wxss;
            }
          } catch (error) {
            console.error(error, wxssFile)
          }
        })
      }
    });
    callback();
  });
};

module.exports = MpvuePlugin;