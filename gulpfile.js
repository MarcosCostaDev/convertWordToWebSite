const configGlobal = require("./app/config/configGlobal"),
    renameFiles = require("./app/renameFiles"),
    menuMain = require("./app/menuMain"),
    gulp = require("gulp"),
    fs = require("fs"),
    path = require("path"),
    mammoth = require("mammoth"),
    through = require("through2"),
    deleteEmpty = require('delete-empty'),
    converter = require("./app/converter"),
    clean = require("gulp-clean"),
    del = require("del"),
    webserver = require('gulp-webserver'),
    flatten = require("gulp-flatten"),
    debug = require('gulp-debug'),
    exec = require('child_process').exec,
    rename = require("gulp-rename");

let options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to lodash.template()
};
let reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
};

let pathDocs = function(){
   return [`${global.config.wordFileSource}\\**\\*.{doc,docx}`,
    `!${global.config.wordFileSource}\\**\\~$*.{doc,docx}`]
}
    

let pathDistMds = [
    `${global.config.mdDist}\\**\\*.{md,MD}`
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
    return gulp.start(["copyIndex.html", "copyIndex.md", "copy-other-files"])
})


gulp.task("copyIndex.html", function () {
    return gulp.src("./webapp/mdwiki.html")
        .pipe(rename('index.html'))
        .pipe(gulp.dest(global.config.dest))
})

gulp.task("copyIndex.md", function () {
    if (!fs.existsSync(path.resolve("./dist/index.md"))) {
        return gulp.src("./webapp/index.md")
            .pipe(gulp.dest(global.config.dest))
    }
    return;
})


gulp.task("copy-other-files", function () {
    return gulp.src(["./webapp/*.js", "./webapp/web.config"])
        .pipe(gulp.dest(global.config.dest))
})

gulp.task("createWebAppOnDest", ["deleteEmpty"], function () {
    return gulp.src(pathDistMds)
    pipe(clean());
})

gulp.task("deleteEmpty", ["deleteOldFiles"], function () {
    return deleteEmpty('./dist', function (err, deleted) {
        console.log(deleted);
    });
})

gulp.task("deleteOldFiles", ["renameMenu"], function () {

    return gulp.src("./dist/md/**/*.md")
        .pipe(through.obj((chunk, enc, cb) => {
            if (chunk.path.replace(path.resolve("./dist/md"), "").indexOf(" ") > 0) {
                if (fs.existsSync(chunk.path)) {
                    fs.unlinkSync(chunk.path);
                }

                cb(null, null)
            }
            else {
                cb(null, chunk)

            }

        }));
})

gulp.task("renameMenu", ["createMenu"], function () {
    gulp.src("./dist/md/**/*.md")
        .pipe(rename(function (path) {
            path.dirname = renameFiles.removerEspecialCharater(path.dirname);
            path.basename = renameFiles.removerEspecialCharater(path.basename);
        }))
        .pipe(gulp.dest("./dist/md"));
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

    return gulp.src(pathDocs(), { read: false })
        .pipe(through.obj((chunk, enc, cb) => {
            converter.convertWordToMd(chunk.history[0]);
            cb(null, chunk)
        }));
})

gulp.task("deleteDist", ["copy-file-to-local-machine"], function () {
    return del('./dist', { force: true });
});

gulp.task("copy-file-to-local-machine", function (cb) {
    if (global.config.wordFileSource.indexOf("\\\\") == 0) {
        exec(`for /R "${global.config.wordFileSource}" %f in (*.docx) do copy \"%f\" "C:\\FAQ" /y`, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            global.config.wordFileSource = "C:\\FAQ";
            cb(err);
          });    
    }
    else{
        cb();
    }

})

gulp.task("deleteMD", function () {
    return del('./dist/md/', { force: true });
});