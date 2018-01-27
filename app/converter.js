const mammoth = require("mammoth"),
    linq = require("linq"),
    fs = require("fs"),
    path = require("path"),
    prepareFiles = require("./prepareFiles"),
    globalConfig = require("./config/configGlobal");

function convertWordToMd(filePath) {
    mammoth.convertToMarkdown({ path: filePath }).then(result => {

        if(result.error)
        {
            console.log(result.error);
            return;
        }

        prepareFiles.getInformationFilePath()


    })
}

exports.convertWordToMd = convertWordToMd;