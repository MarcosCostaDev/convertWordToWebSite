
var mapMenu = [];

exports.addMapMenu = function (filename, dir, href) {
    mapMenu.push({
        filename: filename,
        dir: dir,
        href: href,
        newFileName: filename.replace(/\s/g,"-").replace(/\+/g, "-").replace(/\,/g, ""),
        newDir: dir.replace(/\s/g,"-").replace(/\+/g, "-").replace(/\,/g, ""),
        newHref: href.replace(/\s/g,"-").replace(/\+/g, "-").replace(/\,/g, "")
    });
}


exports.getMapMenu = function () {
    return mapMenu;
}

