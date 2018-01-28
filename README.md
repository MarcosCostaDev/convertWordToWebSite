ConvertWordToWebsite

# <a id="_Toc504849614"></a>Português

## <a id="_Toc504849615"></a>O que é?

O projeto ConvertWordToWebsite utiliza algumas ferramentas para transformar os seus arquivos \.doc / \.docx para \.md em um formato de pasta que basta você colocar no seu servidor web que ele funcionará\.

## <a id="_Toc504849616"></a>Como funciona?

Para começar a utilizar, após baixar o projeto\. Tenha em mente de ter o __node\.js__ instalado na sua máquina, no terminal, você deverá usar o comando 

*npm install*

Após rodar este comando, o projeto estará pronto para uso\.

## <a id="_Toc504849617"></a>Comandos importantes

Utilize esses comandos para rodar seu projeto

*npm start*

O projeto irá transformar todos os arquivos words da pasta selecionada em \.md e iniciará o navegador web com o site funcionando

*npm run build*

O projeto irá transformar todos os arquivos words da pasta selecionada em \.md\.

*npm run only\-server*

O projeto iniciará o navegador web com o site funcionando caso ele esteja construído\.

*npm run delete\-dist *

O projeto iniciará o comando para deletar a pasta dist \(distribuição\)

## <a id="_Toc504849618"></a>Como configurar?

\{

  "name": "criador\-md",

  "version": "1\.0\.0",

  "description": "",

  "siteName": "Convert Word To WebSite",

  "wordFileSource": "C:\\\\FAQ",

  "mdDist": "dist\\\\md",

  "dest": "dist",

  "scripts": \{

    "start": "gulp server",

    "build": "gulp default",

    "only\-server": "gulp only\-server",

    "delete\-dist": "gulp deleteDist"

  \},

  "author": "",

  "license": "ISC",

  "devDependencies": \{

    "del": "^3\.0\.0",

    "gulp": "^3\.9\.1",

    "gulp\-clean": "^0\.4\.0",

    "gulp\-copy": "^1\.1\.0",

    "gulp\-flatten": "^0\.4\.0",

    "gulp\-rename": "^1\.2\.2",

    "gulp\-run\-command": "0\.0\.9",

    "gulp\-webserver": "^0\.9\.1",

    "linq": "^3\.0\.9",

    "mammoth": "^1\.4\.4"

  \}

\}

No package json, você deverá alterar algumas informações\.

siteName – para configurar o nome do site\.

wordFileSource – Caminho da pasta onde estão os seus arquivos word\. Atenção, usar contra\-barra duplicada \\\\ para navegar nas pastas\.

dest – caminho da pasta de distribuição\. \(não alterar\)

mdDist – caminho da pasta de markdown será salvo\. \(não alterar\)

# <a id="_Toc504849619"></a>English

## <a id="_Toc504849620"></a>What is?

## <a id="_Toc504849621"></a>The ConvertWordToWebsite project uses some tools to turn your \.doc / \.docx files to \.md into a folder format that you simply put on your web server as it will work\.

## <a id="_Toc504849622"></a>How is it works?

To start using after downloading the project\. Keep in mind to have node\.js installed on your machine, in the terminal, you must use the command

*npm install*

## <a id="_Toc504849623"></a>After you run this command, the project is ready for use\.

## <a id="_Toc504849624"></a>Important Commands

Use these commands to run your project

*npm start*

The project will transform all words files from the selected folder into \.md and will start the web browser with the site running

*npm run build*

The project will transform all words files from the selected folder into \.md\.

*npm run only\-server*

The project will start the web browser with the site running if it is built\.

*npm run delete\-dist*

The project will start the command to delete the dist \(distribution\)

## <a id="_Toc504849625"></a>How to config?

\{

  "name": "criador\-md",

  "version": "1\.0\.0",

  "description": "",

  "siteName": "Convert Word To WebSite",

  "wordFileSource": "C:\\\\FAQ",

  "mdDist": "dist\\\\md",

  "dest": "dist",

  "scripts": \{

    "start": "gulp server",

    "build": "gulp default",

    "only\-server": "gulp only\-server",

    "delete\-dist": "gulp deleteDist"

  \},

  "author": "",

  "license": "ISC",

  "devDependencies": \{

    "del": "^3\.0\.0",

    "gulp": "^3\.9\.1",

    "gulp\-clean": "^0\.4\.0",

    "gulp\-copy": "^1\.1\.0",

    "gulp\-flatten": "^0\.4\.0",

    "gulp\-rename": "^1\.2\.2",

    "gulp\-run\-command": "0\.0\.9",

    "gulp\-webserver": "^0\.9\.1",

    "linq": "^3\.0\.9",

    "mammoth": "^1\.4\.4"

  \}

\}

In package json, you should change some information\.

siteName \- to configure the site name\.

wordFileSource \- Path of the folder where your word files are\. Attention, use duplicate counterbar \\\\ to browse folders\.

dest \- distribution folder path\. \(do not change\)

mdDist \- markdown folder path will be saved\. \(do not change\)

