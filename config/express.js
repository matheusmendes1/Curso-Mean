// módulo de configuração do express
const express = require('express');
const app = express();

const consign = require('consign');
const bodyParser = require('body-parser');

//static considera ./ como a pasta raiz ----- ESSA É A PONTE
app.use(express.static('./public'));

/* ATIVAR O BODY PARSER ANTES DAS ROTAS COM O CONSIGN*/

app.use(bodyParser.json());

consign( {cwd: 'app' })
    .include('api')
    .then('routes')
    .into(app);

require('../app/routes/foto')(app);
require('../app/routes/grupo')(app);

module.exports = app;

/* 
    Por uma questão de organização, o código que levanta nosso servidor deve ficar na raiz do nosso projeto utilizando o nome alurapic/server.js. 
    Poderia ser qualquer nome de arquivo, mas o nome server.js deixa claro para outros programadores que tudo o que estiver codificado dentro dele 
    diz respeito ao nosso servidor. E o termo raiz do projeto, lembra o que significa? Ele é sinônimo da pasta principal da nossa aplicação, 
    onde tudo começa, a pasta alurapic. É por isso dizemos que server.js está dentro da pasta raiz.

    Aprendemos também que a instalação da plataforma Node.js disponibiliza um "monte de código pronto" que podemos usar. 
    Inclusive chamamos esse "monte de código pronto" de módulos. Cada módulo é uma unidade de código especializada, 
    destinado a responder uma tarefa específica. Podemos combinar vários módulos entre si para construirmos uma aplicação mais complexa, é como brincar de lego.
    
    No início do nosso projeto, precisamos daquele módulo que sabe criar um servidor http e a plataforma Node.js já vem com um módulo por padrão 
    com esta finalidade, o módulo http. Módulos não são carregados automaticamente e devem ser requeridos em nosso código, 
    em nosso caso, alurapic/server.js. Fazemos isso através da função require que recebe como parâmetro o nome do módulo. 
    Em nosso caso, para importarmos o módulo http, fazemos require('http').

    E para levantar nosso servidor? Dentro da pasta raiz do projeto (cuidado redobrado quando você abrir seu terminal, 
    verifique se está dentro da pasta alurapic) usamos o comando node server ou node server.js. Eu prefiro a primeira forma, porque escrevo menos.

    Temos as seguintes afirmativas sobre o Express:
    A) O módulo Express não vem por padrão com o Node.js e deve ser baixado pelo gerenciador de pacotes do Node, o npm.
    B) Instalamos o Express no terminal com o comando npm install express ou npm install express --save.
    C) O Express nada mais é do que um módulo que aplica uma série de middlewares que processam nossas requisições.
    D) O Express é um framework web criado por TJ Hollowaychuck, uma lenda da comunidade open source. 
    Mesmo tão novo na época do lançamento do Express, contribuiu muito mais do que muito programador sexagenário para o mundo open source.

    npm install express@4.13.3 --save

    Você viu neste capítulo o emblemático arquivo package.json. Sobre ele, temos as seguintes afirmativas:
    A) Pode ou não ser criado através do terminal pelo comando npm init.
    B) Guarda as dependências de produção e desenvolvimento.
    C) Seu uso é opcional em um projeto Node.
    D) Sua estrutura nada mais é que uma estrutura JSON

    É possível remover dependências do package.json ao mesmo tempo apagando sua respectiva pasta em node_modules. Basta usar o comando 
    npm uninstall nomeDoModulo --save. É necessário usar o --save, caso contrário o módulo continuará no package.json.

    404 = devolvido pelo servidor quando um arquivo não é encontrado
    500 = quando seu servidor explode com um erro bizarro e você quer dizer que alguém ficará na mão
    200 = quando uma operação é realizada com sucesso, geralmente é enviado com alguma informação
    401 = quando alguém não tem autorização para acessar determinado recurso

    Posso te contar um segredo? A função res.json também envia um código de status para nós, o 200.
    Então, no final, sempre acabamos enviando um código de status para o navegador com alguma outra informação ou só o código de status.

    O problema é que ninguém adicionou o JSON enviado convertido para objeto na propriedade req.body. Precisamos pedir que o Express faça isso 
    para nós através de um middleware, isto é, alguém que filtrará nossas requisições e quando achar um JSON no corpo da mensagem o converterá para objeto Javascript
    e o armazenará na propriedade req.body. O middleware que faz isso é o body-parser. Sua instalação é feita no terminal através do npm:
    npm install body-parser@1.14.1 --save

    O MongoDB é um banco noSQL orientado a documento que armazena seus dados em uma estrutura de dados extremamente parecida com 
    JSON e dependendo da maneira que interagimos com esse banco através do nosso código no backend podemos tratá-lo como tal. 
    Dentro desse contexto, gravaremos nossos dados no formato "JSON", leremos através da nossa aplicação Node.js esse dado que será 
    enviado diretamente para nossa aplicação Angular que entende com facilidade essa estrutura. Repare que durante esse trâmite 
    não gastaremos tempo lidando com conversões, inclusive quando formos atualizar os dados, enviaremos o JSON atualizado que será recebido 
    pelo backend e que será gravado diretamente no banco! Perfeito. No final das contas, nossa aplicação terá menor impedância, que é a discrepância 
    das estrutura de dados do banco e essa estrutura de dados em memória.

    npm install mongoose@4.3.1 --save

    Impedância é o desencontro entre a estrutura dos dados armazenada no banco de dados e a estrutura de dados em memória. 
    Quanto maior for a impedância, mais trabalho o desenvolvedor gastará em conversões entre os dois mundos. 
    O contrário também é verdadeiro, quanto menor a impedância, menos trabalho ele terá. Na MEAN Stack, há a onipresença de uma estrutura de dados 
    utilizada de ponta a ponta, o JSON. Mas Flávio, o MongoDB usa BSON (Binary JSON), você deve estar se perguntando. 
    Sim, meu aluno, porém você verá que sob o ponto de vista do programador, podemos a grosso modo pensar no BSON como um JSON que possui apenas mais tipos.

    Temos as seguintes afirmativas sob o MongoDB:
    A) O MongoDB é um banco de dados baseado em documento com alta performance, disponibilidade e fácil escalabilidade. 
    Porém, muito pouco ele faz para validar documentos, deixando esse quesito sob responsabilidade da aplicação, logo, do programador.

    B) Um documento no MongoDB não segue a estrutura tabular e relacional como em bancos de dados relacionais. 
    A estrutura de dados de um documento é muito semelhante ao JSON, um dos motivos que o torna atrativo para a MEAN Stack.

    C) Existem módulos criados pela comunidade para facilitar a conexão e manipulação de documentos do MongoDB na plataforma Node.js, como o Mongoose.

    D) MongoDB é multiplataforma, por isso pode ser instalado no Windows, Linux e OSX.

    Com o Mongoose, criamos esquemas no lado da aplicação que visam suprir a ausência de esquema no MongoDB. 
    Pense nesses esquemas como esquemas de um banco de dados relacional (não pode aceitar vazio, tem que aceitar apenas texto ou número). 
    A partir desses esquemas são compilados modelos e estes sim são os responsáveis em realizar operações de persistência no banco de dados. 
    Toda a complexidade do driver do MongoDB é encapsulada em todo esse processo, facilitando em muito a vida do desenvolvedor.
*/