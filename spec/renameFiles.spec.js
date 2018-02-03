var renameFiles = require("../app/renameFiles");
describe('rename file functions', function () {
    beforeEach(function () {

    });

    it('should not have special characteres', function () {
        expect(renameFiles.removerEspecialCharater("file-téstõ-jãsmînè")).toBe('file-testo-jasmine');
        expect(renameFiles.removerEspecialCharater("file.menu.teste,teste.md")).toBe("file-menu-testeteste.md");
        expect(renameFiles.removerEspecialCharater("[FAQ] Educacional\\[FAQ] PROCESSOS\\file.menu.teste,teste.md"))
        .toBe("FAQ-Educacional\\FAQ-PROCESSOS\\file-menu-testeteste.md");
    });

});

describe("creating menu feature", function(){
 
    it("should not have menu", function () {
        expect(renameFiles.getMapMenu().length).toEqual(0);    
    });

   
    it("should have one menu", function () {
        renameFiles.addMapMenu("teste.md", "dir", "dir/teste.md");
        expect(renameFiles.getMapMenu().length).toEqual(1);
    });

    it("should not have menu after restart", function () {
        expect(renameFiles.getMapMenu().length).toEqual(1);
        renameFiles.resetMenu();
        expect(renameFiles.getMapMenu().length).toEqual(0);
    });
})

