const configGlobal = require("./app/config/configGlobal"),
    gulp = require("gulp"),
    mammoth = require("mammoth"),
    through = require("through2"),
    converter = require("./app/converter"),
    clean = require("gulp-clean"),
    rename = require("gulp-rename");

let caminhos = [
    `${configGlobal.configuracao.wordFileSource}\\*.{doc,docx}`,
    `!${configGlobal.configuracao.wordFileSource}\\~$*.{doc,docx}`,
]


gulp.task("default", ["createWiki"]);

gulp.task("createWiki", ["createMenu"], function () {

    gulp.start(["copyIndex.html", "copyIndex.md"])
   
})


gulp.task("copyIndex.html", function () {
    return gulp.src("./webapp/mdwiki.html")
        .pipe(rename('index.html'))
        .pipe(gulp.dest(configGlobal.configuracao.dist))
})

gulp.task("copyIndex.md", function () {
    return gulp.src("./webapp/index.md")
        .pipe(gulp.dest(configGlobal.configuracao.dist))
})

gulp.task("createMenu", ["createMds"], function () {

})

gulp.task("createMds", ["deleteDist"], function () {

    return gulp.src(caminhos)
        .pipe(through.obj((chunk, enc, cb) => {
            converter.convertWordToMd(chunk.history[0]);
            cb(null, chunk)
        }));
})

gulp.task("deleteDist", function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});