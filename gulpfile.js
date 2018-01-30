const configGlobal = require("./app/config/configGlobal"),
    menuMain = require("./app/menuMain"),
    gulp = require("gulp"),
    fs = require("fs"),
    path = require("path"),
    mammoth = require("mammoth"),
    through = require("through2"),
    converter = require("./app/converter"),
    clean = require("gulp-clean"),
    del = require("del"),
    webserver = require('gulp-webserver'),
    flatten = require("gulp-flatten"),
    rename = require("gulp-rename");

let pathDocs = [
    `${configGlobal.configuracao.wordFileSource}\\**\\*.{doc,docx}`,
    `!${configGlobal.configuracao.wordFileSource}\\**\\~$*.{doc,docx}`
]
let pathDistMds = [
    `${configGlobal.configuracao.mdDist}\\**\\*.{md,MD}`
]


gulp.task("default", ["createWiki", "deleteMD"]);

gulp.task("server", ["createWiki", "deleteMD"], function () {
    return gulp.start("only-server");
});

gulp.task("only-server", function () {

    if (fs.existsSync(path.resolve("./dist/md"))) {
        return gulp.src("./dist")
            .pipe(webserver({
                open: true,
                livereload: false,
                root: "./dist",
                directoryListing: false,
                fallback: 'index.html'
            }));
    }
    else {
        return gulp.src("./")
            .pipe(webserver({
                open: true,
                livereload: false,
                directoryListing: true,
                fallback: 'index.html'
            }));
    }

})

gulp.task("createWiki", ["createWebAppOnDest"], function () {
    return gulp.start(["copyIndex.html", "copyIndex.md", "copy-javascript"])
})


gulp.task("copyIndex.html", function () {
    return gulp.src("./webapp/mdwiki.html")
        .pipe(rename('index.html'))
        .pipe(gulp.dest(configGlobal.configuracao.dest))
})

gulp.task("copyIndex.md", function () {
    if (!fs.existsSync(path.resolve("./dist/index.md"))) {
        return gulp.src("./webapp/index.md")
            .pipe(gulp.dest(configGlobal.configuracao.dest))
    }
    return;
})


gulp.task("copy-javascript", function () {
    return gulp.src("./webapp/*.js")
        .pipe(gulp.dest(configGlobal.configuracao.dest))
})

gulp.task("createWebAppOnDest", ["createMenu"], function () {
    return gulp.src(pathDistMds)
    pipe(clean());
})

gulp.task("copyMdToDist", ["createMenu"], function () {
    return gulp.src(pathDistMds)
        .pipe(flatten())
        .pipe(gulp.dest(configGlobal.configuracao.dest))
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
    return del('./dist', { force: true });
});


gulp.task("deleteMD", function () {
    return del('./dist/md/', { force: true });
});