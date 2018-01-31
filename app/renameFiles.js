
var mapMenu = [];

function removerEspecialCharater(newString) {
    var string = newString;

    if(string == ".") return string;
    
    var mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        A: /[ÁÀÂÃÄ]/g,
        e: /[\xE8-\xEB]/g,
        E: /[ÉÈÊ]/g,
        i: /[\xEC-\xEF]/g,
        I: /[íì]/g,
        o: /[\xF2-\xF6]/g,
        O: /[ÓÒÔÕÖ]/g,
        u: /[\xF9-\xFC]/g,
        U: /[ÚÙÜ]/g,
        c: /\xE7/g,
        C: /Ç/g,
        n: /\xF1/g,
        '-': /\s|\+|\.(?=.*\.)/g,
        "": /\,|\.(?=.*\.)/g
    };

    for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace(expressaoRegular, letra);
    }

    return string;

}
exports.addMapMenu = function (filename, dir, href) {
    mapMenu.push({
        filename: filename,
        dir: dir,
        href: href,
        newFileName: removerEspecialCharater(filename),
        newDir: removerEspecialCharater(dir),
        newHref: removerEspecialCharater(href)
    });
}


exports.getMapMenu = function () {
    return mapMenu;
}


exports.removerEspecialCharater = removerEspecialCharater;
