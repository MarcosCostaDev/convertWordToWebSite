const globalConfig = require("./config/configGlobal"),
    Enumerable = require("linq"),
    fs = require("fs"),
    path = require("path");
let itensMenuTemp = [];
let pathBase = path.resolve(globalConfig.configuracao.mdDist) + "\\";



function prepareMenu(mdPath) {
    let fileMd = mdPath.replace(pathBase, "");
    let itensMenuCreating = fileMd.split("\\");

    itensMenuTemp.push({
        parent: path.dirname(mdPath),
        fileName: path.basename(fileMd),
        fullpath: mdPath,
        href: mdPath.replace(pathBase, "").replace(/\\/g, "/")
    });
}

function generateMenu() {

    let itens = Enumerable.from(itensMenuTemp)
        .groupBy(p => p.parent)
        .select((g, i) => {
            let parent = path.basename(g.key());
            let itemTemp = `[${parent}]()\n`;
            let texto = g.aggregate(( prev, atual) => {
                itemTemp += `* [${atual.fileName.replace(".md", "")}](${atual.href}) \n`;
                return itemTemp;
            });
            return texto           

        }).toArray();

    for (let item of itens) {
       fs.appendFileSync(`${path.resolve(globalConfig.configuracao.dist)}\\navigation.md`, item + "\n\n", "utf-8");

    }

}

exports.generateMenu = generateMenu;
exports.prepareMenu = prepareMenu;
