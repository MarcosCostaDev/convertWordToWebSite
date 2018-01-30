const globalConfig = require("./config/configGlobal"),
renameFiles = require("./renameFiles"),
    Enumerable = require("linq"),
    fs = require("fs"),
    path = require("path");
let itensMenuTemp = [];
let pathBase = path.resolve(globalConfig.configuracao.mdDist) + "\\";



function prepareMenu(mdPath) {
    let fileMd = mdPath.replace(pathBase, "");
    let itensMenuCreating = fileMd.split("\\");

    if (!path.basename(fileMd).toUpperCase().startsWith("INDEX")) {
        itensMenuTemp.push({
            parent: path.dirname(mdPath),
            folderParent: path.dirname(path.dirname(mdPath)),
            fileName: path.basename(fileMd).toUpperCase(),
            fullpath: mdPath,
            href: "/md/" + mdPath.replace(pathBase, "").replace(/\\/g, "/")
        });
    }

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
            if (path.resolve(folderParent) == path.resolve(globalConfig.configuracao.mdDist)) {
                itemTemp = `\n\n[${parent}]()\n\n`;
            }
            else {
                itemTemp = `\n - - - - \n* # ${parent}\n\n`;
            }
            let text = "";
            if (g.count() > 1) {
                text += g.aggregate((prev, atual) => {
                    if (typeof prev == 'object') {
                        itemTemp += `* [${prev.fileName.replace(".MD", "")}](${prev.href}) \n` + `* [${atual.fileName.replace(".MD", "")}](${atual.href}) \n`;
                        renameFiles.addMapMenu(prev.fileName.replace(".MD", ""), prev.folderParent, prev.href);
                    }
                    else {
                        itemTemp += `* [${atual.fileName.replace(".MD", "")}](${atual.href}) \n`;
                    }

                    renameFiles.addMapMenu(atual.fileName.replace(".MD", ""), atual.folderParent, atual.href);

                    return itemTemp;
                });
            }
            else {
                itemTemp += `* [${g.first().fileName.replace(".MD", "")}](${g.first().href}) \n`
                renameFiles.addMapMenu(g.first().fileName.replace(".MD", ""), g.first().folderParent, g.first().href);
                text += itemTemp;
            }

            return text;

        }).toArray();

    let mapMenu = renameFiles.getMapMenu();
    for (let item of itens) {
        let itemMap = Enumerable.from(mapMenu).first(p => item.indexOf(p.href) > 0)
        if(itemMap)
        {
            item = item.replace(itemMap.href, itemMap.newHref);
        }
        
        fs.appendFileSync(`${path.resolve(globalConfig.configuracao.dest)}\\navigation.md`, item, "utf-8");
    }

}

exports.generateMenu = generateMenu;
exports.prepareMenu = prepareMenu;
