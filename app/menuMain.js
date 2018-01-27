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
        folderParent: path.dirname(path.dirname(mdPath)),
        fileName: path.basename(fileMd),
        fullpath: mdPath,
        href: "/md/" + mdPath.replace(pathBase, "").replace(/\\/g, "/")
    });
}

function generateMenu() {
    fs.appendFileSync(`${path.resolve(globalConfig.configuracao.dest)}\\navigation.md`, `# ${globalConfig.configuracao.siteName}`, "utf-8");

    let itens = Enumerable.from(itensMenuTemp)
        .groupBy(p => p.parent)
        .orderBy(g => g.key())
        .select((g, i) => {
            let parent = path.basename(g.key());
            let folderParent = g.first().folderParent;
            let itemTemp = "";
            if(path.resolve(folderParent) == path.resolve(globalConfig.configuracao.mdDist))
            {
                itemTemp = `\n\n[${parent}]()\n\n`;
            }
            else
            {
                itemTemp = `\n - - - - \n* # ${parent}\n\n`;
            }
            
            let texto = g.aggregate((prev, atual) => {
                itemTemp += `* [${atual.fileName.replace(".md", "")}](${atual.href}) \n`;
                return itemTemp;
            });
            return texto;

        }).toArray();

    for (let item of itens) {
        fs.appendFileSync(`${path.resolve(globalConfig.configuracao.dest)}\\navigation.md`, item, "utf-8");

    }

}

exports.generateMenu = generateMenu;
exports.prepareMenu = prepareMenu;
