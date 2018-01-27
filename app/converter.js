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
        let filePathInfo = prepareFiles.prepareDistDirectoryFile(filePath);
        let fileWithExtension = filePathInfo.filePathWithoutExtension + ".md";

        let fileDistPath = prepareFiles.prepareFolderDistDirectory(filePathInfo.fileNameWithoutExtension, "-");
        fs.writeFileSync(fileDistPath.filePathFinal + ".md", result.value, "utf-8");
        console.log(`File ${fileWithExtension} created!`);

    }).catch(err => {
        console.log(err);
    })
}

exports.convertWordToMd = convertWordToMd;