// módulo de configuração do express
const express = require('express');
const app = express();

const consign = require('consign');
const bodyParser = require('body-parser');

app.set('secret', 'homemavestruz'); 

//static considera ./ como a pasta raiz ----- ESSA É A PONTE
app.use(express.static('./public'));

/* ATIVAR O BODY PARSER ANTES DAS ROTAS COM O CONSIGN*/

app.use(bodyParser.json());

consign( {cwd: 'app' })
    .include('models')
    .then('api')
    .then('routes/auth.js') // garantindo que esse módulo vai ser carregado primeiro
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

    O MongoDB trabalha com o conceito de documento. Dentro desse contexto, podemos afirmar que no MongoDB:
    A) Um documento é uma estrutura muito semelhante ao JSON, com a diferença de que possui mais tipos.
    B) Para agrupar documentos, é utilizado coleções (collections), que são análogas as tabelas de um banco de dados relacional.
    C) Dentro de uma collection, podemos salvar documentos com estrutura diferentes.
    D) Documentos são gravados na estrutura BSON

    Aprendemos que o Mongoose trabalha com schemas e modelos. Temos as seguintes afirmativas a respeito dessas duas estruturas fornecidas pelo Mongoose:
    B) Compilamos modelos a partir de esquemas e usamos esses modelos para interagirmos efetivamente com o banco.
    C) Quando compilamos um modelo fornecendo seu nome, o Mongoose adotará por padrão como nome da collection o nome do modelo no plural.

    Usamos model.findById e como o nome já diz, queremos procurar por ID. É por isso que a função recebe o ID que desejamos procurar. 
    Lembra de onde vem esse ID? Enviado pela aplicação Angular. Lembra como pegamos esse id? Através de req.params.id.

    A função model.remove não recebe diretamente o ID da foto que desejamos remover. Precisamos passar como primeiro parâmetro um objeto 
    (um query object, para usar o termo mais correto) que contenha a chave e o valor da propriedade que utilizaremos como critério de consulta. 
    O restante é igualzinho ao que já vimos. Mas atenção: sua função success, mesmo que você só queira apagar e não fazer mais nada, 
    ainda precisa devolver uma resposta. Lembre-se que podemos devolver código de status como resposta e 
    não necessariamente dados na estrutura JSON ou texto.

    Lembre-se que a função create recebe um JSON. Obtemos o JSON com os dados da foto enviado através de req.body e não req.params.body.

    O mais importante é lembrar que o primeiro parâmetro da função findByIdAndUpdate é o ID do 
    documento que queremos atualizar e o segundo os dados que serão atualizados.

    Json Web Token -> https://tools.ietf.org/html/rfc7519

    npm install jsonwebtoken@5.4.1 --save 

    Temos as seguintes afirmações sobre o JWT:
    A) JWT (JSON Web Token) é um padrão aberto que define de maneira compacta e auto-contida uma maneira de transmitir informações entre partes interessadas através de um objeto JSON.
    B) A informação transferida através do JWT pode ser verificada e confiável porque é assinada digitalmente.
    C) A instalação do Node.js padrão não possui nenhum módulo que nos ajude na criação de JWT's.
    D) JWT pode ser assinado com uma frase secreta, que não deve ser compartilhada.
*/