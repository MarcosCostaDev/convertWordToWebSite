const configGlobal = require("./app/config/configGlobal"),
    gulp = require("gulp"),
    mammoth = require("mammoth"),
    through = require("through2"),
    converter = require("./app/converter")

let caminhos = [
    `${configGlobal.configuracao.wordFileSource}\\*.{doc,docx}`,
    `!${configGlobal.configuracao.wordFileSource}\\~$*.{doc,docx}`,
]


gulp.task("default", ["createWiki"], function () {


});

gulp.task("createWiki", ["createMenu"], function () {

})


gulp.task("createMenu", ["createMds"], function () {

})

gulp.task("createMds", function () {

    return gulp.src(caminhos)
        .pipe(through.obj((chunk, enc, cb) => {
            converter.convertWordToMd(chunk.history[0]);
            cb(null, chunk)
        }));
})