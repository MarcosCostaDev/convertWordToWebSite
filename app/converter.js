const mammoth = require("mammoth"),
    linq = require("linq"),
    fs = require("fs"),
    path = require("path"),
    prepareFiles = require("./prepareFiles"),
    globalConfig = require("./config/configGlobal");

function convertWordToMd(filePath) {
    mammoth.convertToMarkdown({ path: filePath }).then(result => {

        if (result.error) {
            console.log(result.error);
            return;
        }

        let filePathInfo = prepareFiles.prepareDistDirectoryFile(filePath)
        fs.writeFileSync(filePathInfo.filePathWithoutExtension + ".md", result.value, "utf-8", function (file, err) {
            console.log(file);
        });

    }).catch(err => {
        console.log(err);
    })
}

exports.convertWordToMd = convertWordToMd;