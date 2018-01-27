const configGlobal = require("./app/config/configGlobal"),
    menuMain = require("./app/menuMain"),
    gulp = require("gulp"),
    mammoth = require("mammoth"),
    through = require("through2"),
    converter = require("./app/converter"),
    clean = require("gulp-clean"),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

let pathDocs = [
    `${configGlobal.configuracao.wordFileSource}\\*.{doc,docx}`,
    `!${configGlobal.configuracao.wordFileSource}\\~$*.{doc,docx}`
]
let pathDistMds = [
    `${configGlobal.configuracao.mdDist}\\**\\*.md`
]


gulp.task("default", ["createWiki"]);

gulp.task("server", ["createWiki"], function () {
    browserSync.init({
        server: {
            baseDir: `./dist`
        }
    });

    gulp.watch(pathDistMds).on("change", reload);
});

gulp.task("only-server", function(){
    browserSync.init({
        server: {
            baseDir: `./dist`
        }
    });

    gulp.watch(pathDistMds).on("change", reload);
})

gulp.task("createWiki", ["createMenu"], function () {
    return gulp.start(["copyIndex.html", "copyIndex.md", "copy-javascript"])
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


gulp.task("copy-javascript", function () {
    return gulp.src("./webapp/*.js")
        .pipe(gulp.dest(configGlobal.configuracao.dist))
})

gulp.task("createMenu", ["prepareMenu"], function () {
    return gulp.start(function () {
        menuMain.generateMenu();
    })
})

gulp.task("prepareMenu", ["createMds"], function () {
    return gulp.src(pathDistMds, { read: false })
        .pipe(through.obj((chunk, enc, cb) => {
            menuMain.prepareMenu(chunk.history[0]);
            cb(null, chunk)
        }))
})

gulp.task("createMds", ["deleteDist"], function () {
    return gulp.src(pathDocs, { read: false })
        .pipe(through.obj((chunk, enc, cb) => {
            converter.convertWordToMd(chunk.history[0]);
            cb(null, chunk)
        }));
})

gulp.task("deleteDist", function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});