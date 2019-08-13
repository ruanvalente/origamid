# JavaScript Assíncrono.

## Síncrono vs Assíncrono.

## Síncrono.

Espera a tarefa acabar para poder continuar a próxima.

## Assíncrono.

Move para a próxima tarefa antes da anterior terminar. O trabalho será executado no 'fundo' e quando terminado, será colocado na fila (task queue).

## Exemplos métodos assíncronos dentro do Javascript.

setTimeout, Ajax, Promises, Fetch, Async.

## Vantagens.

## Carregamento ao fundo.

Não temos problemas de travamento de script. É possível utilizar o stie enquanto o processamento é realizado em background.

## Função ao término.

Podemos ficar de olho no carregamento e executar uma função assim que ele terminar.

## Requisições ao servidor.

Não precisamos recarregar a página por completo à cada requisição feita ao server.

# Promises.

## new Promise().

**Promise** é uma função construtora de promessas. Existem dois resultados possíveis de uma promessa, ela pode ser resolvida, com a execução do primeiro argumento, ou rejeitada se o segundo argumento for ativado.

```js
const promessa = new Promise(function(resolve, reject) {
  let condicao = true
  if (condicao) {
    resolve()
  } else {
    reject()
  }
})
console.log(promessa) // Promise {<resolved>: undefined}
```

## resolve().

Podemos passar um argumento na função **resolve()**, este será enviado junto com a resolução da Promise.

```js
const promessa = new Promise(function(resolve, reject) {
  let condicao = true

  if (condicao) {
    resolve('Eu estou pronto para resolver')
  } else {
    reject()
  }
})

console.log(promessa) // Promise {<resolved>: "Eu estou pronto para resolver"}
```

## reject().

Qunado a condição de resolução da promise não é atingida, ativamos a função **reject** para rejeitar a mesma. Podemos indicar no console um erro, informado que a promise foi rejeitada.

```js
const promessa = new Promise(function(resolve, reject) {
  let condicao = false

  if (condicao) {
    resolve('Estou pronto')
  } else {
    reject(Error('Algo deu errado !'))
  }
})

console.log(promessa) // Promise {<rejected>: Error:...}
```

## then().

O poder das Promises está no método **then()** do seu protótipo. O callback deste método só será ativado quando a promise for resolvida. O argumento do callback será o valor passado na função **resolve**.

```js
const promessa = new Promise(function(resolve, reject) {
  let condicao = true
  if (condicao) {
    resolve('Estou pronto')
  } else {
    reject(Error('Um erro ocorreu'))
  }
})

promessa.then(function(resolucao) {
  console.log(resolucao) // 'Estou pronto'
})
```

## Assíncrono.

As promises não fazem sentido quando o código executado dentro da mesma é apenas código síncrono. O poder está na execução de código assíncrono que executará o **resolve()** ao final dele.

```js
const promessa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Resolvida')
  }, 1000)
})

promessa.then(resolucao => console.log(resolucao)) // 'Resolvida' apos 1s.
```

## then().then().

O método **then()** retorna outra Promise. Podemos colocar then() após then() e fazer um encadeamento de promessas. O valor do primeiro argumento de cada then, será o valor do retorno anterior.

```js
const promessa = new Promise((resolve, reject) => {
  resolve('Etapa 1')
})
promessa
  .then(resolucao => {
    console.log(resolucao) // 'Etapa 1';
    return 'Etapa 2'
  })
  .then(resolucao => {
    console.log(resolucao) // 'Etapa 2';
    return 'Etapa 3'
  })
  .then(r => r + 4)
  .then(r => {
    console.log(r) // Etapa 34
  })
```

## catch().

O método **catch()**, do protótipo de Promises, adicionam um callback a promise que será ativado caso a mesma seja rejeitada.

```js
const promessa = new Promise((resolve, reject) => {
  let condicao = false
  if (condicao) {
    resolve('Estou pronto!')
  } else {
    reject(Error('Um erro ocorreu.'))
  }
})
promessa
  .then(resolucao => {
    console.log(resolucao)
  })
  .catch(reject => {
    console.log(reject)
  })
```

## then(resolve, reject).

Podemos passar a função que será ativada caso a promise seja rejeitada, direto no método then, como segundo argumento.

```js
const promessa = new Promise((resolve, reject) => {
  let condicao = false
  if (condicao) {
    resolve('Estou pronto!')
  } else {
    reject(Error('Um erro ocorreu.'))
  }
})
promessa.then(
  resolucao => {
    console.log(resolucao)
  },
  reject => {
    console.log(reject)
  }
)
```

## finally().

**finally()** executará a função anônima assim que a promessa acabar. A diferença do finally é que ele será executado independente do resultado, se for resolvida ou rejeitada.

```js
const promessa = new Promise((resolve, reject) => {
  let condicao = false
  if (condicao) {
    resolve('Estou pronto!')
  } else {
    reject(Error('Um erro ocorreu.'))
  }
})
promessa
  .then(
    resolucao => {
      console.log(resolucao)
    },
    reject => {
      console.log(reject)
    }
  )
  .finally(() => {
    console.log('Acabou') // 'Acabou'
  })
```

## Promise.all().

Retornará uma nova promise assim que todas as promises dentro dela forem resolvidas ou pelo menos uma rejeitada. A resposta é um array com as respostas de cada promise.

```js
const login = new Promise(resolve => {
  setTimeout(() => {
    resolve('Login Efetuado')
  }, 1000)
})
const dados = new Promise(resolve => {
  setTimeout(() => {
    resolve('Dados Carregados')
  }, 1500)
})
const tudoCarregado = Promise.all([login, dados])
tudoCarregado.then(respostas => {
  console.log(respostas) // Array com ambas respostas
})
```

## Promise.race().

Retornará uma nova promise assim que a primeira promise for resolvida ou rejeitada. Essa nova promise terá a resposta da primeira resolvida.

```js
const login = new Promise(resolve => {
  setTimeout(() => {
    resolve('Login Efetuado')
  }, 1000)
})
const dados = new Promise(resolve => {
  setTimeout(() => {
    resolve('Dados Carregados')
  }, 1500)
})
const carregouPrimeiro = Promise.race([login, dados])
carregouPrimeiro.then(resposta => {
  console.log(resposta) // Login Efetuado
})
```

# Fetch.

## Fetch API.

Permite fazemos requisições HTTP atráves do método **fetch()**. Este método retorna a resolução de uma Promise. Podemos então utilizar o then para interagirmos com a resposta, que é um obejto do tipo _Response_.

```js
fetch('./arquivo.txt').then(function(response) {
  console.log(response) // Response HTTP (Objeto)
})
```

## Response.

O objeto Response, possui um corpo com contéudo da resposta. Esse corpo pode ser transformado utilizando métodos do protótipo do objeto Response. Estes retornam outras promises.

```js
fetch('./arquivo.text')
  .then(function(response) {
    return response.text()
  })
  .then(function(body) {
    console.log(body)
  })
```

## Servidor Local.

O fetch faz uma requisição HTTP/HTTPS. Se você iniciar um site local diretamente pelo index.html, sem um servidor local, o fetch não irá funcionar.

```js
fetch('c:/files/arquivo.txt')
  .then(response => {
    return response.text()
  })
  .then(corpo => {
    console.log(corpo)
  }) // erro
```

> Se dermos um espaço após o objeto ou pularmos linha, o método continua funcionando.

## .json().

Um tipo de formato de dados muito utilizado com Javascript é o **JSON** _(Javascript Object Notation)_, pelo fato dele possuir basicamente a mesma sintaxe que a de um Objeto Javascript. **.json()** transforma um corpo em json em um objeto Javascript.

```js
fetch('https://viacep.com.br/ws/01001000/json/')
  .then(response => response.json())
  .then(response => console.log(response))
```

## .text().

Podemos utilizar o **.text()** para diferentes formatos como text, json, html, css, js e mais.

```js
const styleElement = document.createElement('style')

fetch('./style.css')
  .then(response => response.text())
  .then(style => {
    styleElement.innerHTML = style
    document.body.appendChild(style)
  })
```

## HTML e .text().

Podemos pegar um arquivo inteiro em HTML, transformar o corpo em texto e inserir em uma div com innerHTML. A partir dai podemos manipular esses dados como um DOM qualquer.

```js
const div = document.createElement('div')

fetch('./sobre.html')
  .then(response => response.text())
  .then(htmlBody => {
    div.innerHTML = htmlBody
    const titulo = div.querySelector('h1')
    document.querySelector('h1').innerText = titulo.innerText
  })
```

## .blob().

Um blob é um tipo de objeto utilizado para representação de dados de um arquivo. O blob pode ser utilizado para transformarmos requisições de imagens por exemplo. O blob gera um URL único.

```js
const div = document.createElement('div')

fetch('./imagem.png')
  .then(response => response.blob())
  .then(imgBlob => {
    const blobURL = URL.createObjectURL(imgBlob)
    console.log(blobURL)
  })
```

## .clone().

Ao utilizar os métodos acima, text, json e blob, a resposta é modificada. Por isso existe o método clone, caso você necessite transformar uma resposta em diferentes valores.

```js
const div = document.createElement('div')

fetch('https://viacep.com.br/ws/01001000/json/').then(response => {
  const cloneResponse = response.clone()
  response.json().then(json => {
    console.log(json)
  })
  cloneResponse.text().then(text => {
    console.log(text)
  })
})
```

## .headers

É uma propriedade que possui os cabeçalhos da requisição. É um tipo de dado iterável então podemos utilizar o forEach para vermos cada um deles.

```js
const div = document.createElement('div')

fetch('https://viacep.com.br/ws/01001000/json/').then(response => {
  response.headers.forEach(console.log)
})
```

## .status e .ok

Retorna o status da requisição. Se foi 404, 200, 202 e mais. Ok, retorna um valor booleano sendo true para uma requisição de sucesso e false para uma sem sucesso.

```js
const div = document.createElement('div')

fetch('https://viacep.com.br/ws/01001000/json/').then(response => {
  console.log(response.status, response.ok)
  if (response.status === 404) {
    console.log('Página não encontrada')
  }
})
```

## .url e .type.

**.url** retorna a url da requisição **.type** retorna o tipo da resposta.

```js
const div = document.createElement('div')
fetch('https://viacep.com.br/ws/01001000/json/').then(response => {
  console.log(response.type, response.url)
})
//types
// basic: feito na mesma origem
// cors: feito em url body pode estar disponível
// error: erro de conexão
// opaque: no-cors, não permite acesso de outros sites
```

## Exercícios.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Fetch</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="cep">
      <form>
        <label for="cep">CEP</label>
        <input type="text" name="cep" id="cep" data-js="inputCEP" />
        <input type="button" value="Buscar CEP" data-js="buttonCEP" />
      </form>
    </div>
    <div class="resultado" data-js="resultCEP"></div>

    <div class="blockchain">
      <p class="btc">Preço BTC: <span data-js="resultBTC"></span></p>
    </div>

    <div class="piada">
      <p data-js="chucknorrisJokes">Carregando Piadas....</p>
      <button class="btn" data-js="nextJoke">Próxima</button>
    </div>
    <script src="main.js"></script>
  </body>
</html>
```

```js
'use strict'

// Utilizando a API https://viacep.com.br/ws/${CEP}/json/
// crie um formulário onde o usuário pode digitar o cep
// e o endereço completo é retornado ao clicar em buscar
const $inputCEP = document.querySelector('[data-js="inputCEP"]')
const $buttonCEP = document.querySelector('[data-js="buttonCEP"]')
const $resultCEP = document.querySelector('[data-js="resultCEP"]')

function hanldeClick(e) {
  const cep = $inputCEP.value
  getCEP(cep)
  $inputCEP.value = ''
}

function getCEP(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.text())
    .then(response => {
      $resultCEP.innerText = response
    })
}

$buttonCEP.addEventListener('click', hanldeClick)

// Utilizando a API https://blockchain.info/ticker
// retorne no DOM o valor de compra da bitcoin and reais.
// atualize este valor a cada 30s
const $resultBTC = document.querySelector('[data-js="resultBTC"]')

function getBTC() {
  fetch('https://blockchain.info/ticker')
    .then(response => response.json())
    .then(
      response =>
        ($resultBTC.innerText = ('R$ ' + response.BRL.buy).replace('.', ','))
    )
}

// setInterval(getBTC, 500)

// Utilizando a API https://api.chucknorris.io/jokes/random
// retorne uma piada randomica do chucknorris, toda vez que clicar em próxima

const $chucknorrisJokes = document.querySelector('[data-js="chucknorrisJokes"]')
const $nextJoke = document.querySelector('[data-js="nextJoke"]')

function nextJokeData() {
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(response => {
      $chucknorrisJokes.innerText = response.value
    })
}

setTimeout(nextJokeData, 2000)
$nextJoke.addEventListener('click', nextJokeData)
```

# JSON.

Javascript Object Notation (JSON) é um formato de organização de dados, compostos por um conjunto de chave e valor. As aspas duplas são obrigatórias. Tanto na chave quanto no valor quando este for uma String.

```json
{
  "id": 1,
  "nome": "Ruan Valente",
  "email": "email@email.com"
}
```

## Valores.

Os valores podem ser Numbers, Strings, Boolean, Arrays, Objects e null.

```json
{
  "id": 1,
  "faculdade": false,
  "pertences": ["lapis", "caderno", "caneta"],
  "endereco": {
    "cidade": "São Paulo",
    "pais": "Brasil"
  },
  "casado": null
}
```

## Arrays e Objetos.

É comum possuirmos Array's com objetos em cada valor da Array. Cuidado para não colocar vírgula no último item do objeto ou Array.

```json
[
  {
    "id": 1,
    "aula": "JavaScript",
    "tempo": "25min"
  },
  {
    "id": 2,
    "aula": "HTML",
    "tempo": "15min"
  },
  {
    "id": 3,
    "aula": "CSS",
    "tempo": "10min"
  }
]
```

## JSON.parse(object) e JSON.stringify(str).

**JSON.parse()** irá transformar um texto JSON em um objeto Javascript. **JSON.stringify()** irá transformar um objeto Javascript em uma string no formato **JSON**.

```js
const textoJSON = '{"id": 1, "titulo": "JavaScript", "tempo": "25min"}'
const textoOBJ = JSON.parse(textoJSON)
const enderecoOBJ = {
  cidade: 'São Paulo',
  rua: 'Ali Perto',
  pais: 'Brasil',
  numero: 50
}
const enderecoJSON = JSON.stringfy(enderecoOBJ)
```

## Exemplo Real.

Podemos guardar por exemplo no localStorage, uma string como valor de uma propriedade. E retornar essa string como um objeto.

```js
const configuracoes = {
  player: 'Google API',
  tempo: 25.5,
  aula: '2-1 JavaScript',
  vitalicio: true
}

localStorage.configuracoes = JSON.stringify(configuracoes)

const pegarConfiguracoes = JSON.parse(localStorage.configuracoes)
```

# API e HTTP.

## API.

- Application

  - Um servidor, aplicativo, objeto Javascript ou qualquer outra coisa que você interaja através de comandos. Ao digitar uma URL, estamos utilizando a API do browser para se comunicar com a API do servidor.

- Programming

  - Programação, isso significa que um comando irá encadear uma cadeia de eventos pré-definidos. O resultado esperado é geralmente o mesmo.

- Interface

  - A interface são os comandos criados para permitir a interação com a aplicação: _'VIOLÃO'.toUpperCase()_ é um método que faz parte da interface do objeto String. A interação com a interface retorna um efeito / resposta.

## Exemplos de API'S.

- Github.

  - https://api.github.com/users/ruanvalente
  - https://api.github.com/users/ruanvalente/followers

- Array / Element.

  - [].map()
  - [].filter()
  - Element.classList
  - Element.attributes

- Tempo.
  - https://www.metaweather.com/api/location/455825/
  - https://github.com/toddmotto/public-apis

## HTTP.

Hypertext Transfer Protocol é o protocolo utilizado para enviarmos/recebemos arquivos e dados na Web.

```js
fetch('https://pokeapi.co/api/v2/pokemon/')
  .then(response => response.json())
  .then(pokemon => console.log(pokemon))
```

## URL e Method.

Uma requisição HTTP é feita através de uma URL. O método padrão é o _GET_, mas existem outros como _POST_, _UPDATE_, _DELETE_, _HEADER_ e mais.

```js
const url = 'https://jsonplaceholder.typicode.com/posts/'
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf8'
  },
  body: '"aula": "Javascript"'
}

fetch(url, options)
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })
```

## Method.

- GET

  - O método GET requisita uma representação do recurso especificado. Requisições usando GET devem apenas recuperar dados e não devem ter qualquer outro efeito.

- POST

  - Envia dados para serem processados (por exemplo, dados de um formulário HTML) para o recurso especificado. Os dados são incluídos no corpo do comando. Sua utilização em uma requisição ocorre quando é necessário enviar dados ao servidor para serem processados, geralmente por um programa script identificado no Request-URI. Uma requisição por meio desse método sempre requer que as informações submetidas sejam incluídas no corpo da mensagem e formatadas como uma query string, além de conter cabeçalhos adicionais especificando seu tamanho (Content-Length) e seu formato (Content-Type). Por isso, esse método oferece uma maior segurança em relação aos dados transferidos, ao contrário do método GET que os dados são anexados a URL, ficando visíveis ao usuário.

- PUT

  - O método PUT envia os dados de forma semelhante ao POST, através do corpo do HTTP a diferença entre os 2 métodos é semântica. Por exemplo:

  - Caso você necessite atualizar os dados de um usuário, utilizando o método PUT você pode os atualizar diversas vezes, pois o PUT vai sobrescrever os dados com isso ficará somente com um único registro atualizado.

  - Se você executasse este mesmo procedimento utilizando o método POST, você criaria diversos registros para cada requisição realizada.

- DELETE

  - Exclui o recurso.

- HEADER

  - Variação do GET em que o recurso não é retornado. É usado para obter metainformações por meio do cabeçalho da resposta, sem ter que recuperar todo o conteúdo.

## GET.

GET irá puxar as informações da URL. Não é necessário informar que o método é GET, pois este é o padrão.

```js
const url = 'https://jsonplaceholder.typicode.com/posts/'

fetch(url, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => console.log(data))
```

## POST.

POST irá criar uma nova postagem, utilizando o tipo de conteúdo especifico no headers e utilizando o conteúdo do body.

```js
let url = 'https://jsonplaceholder.typicode.com/posts/'
let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: '{"titulo": "Javascript ES6+"}'
}
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
```

## PUT.

PUT irá atualizar o conteúdo da URL com o que for informado no conteúdo do body.

```js
const url = 'https://jsonplaceholder.typicode.com/posts/1/'

fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: '{"titulo": "Javascript ES6+"}'
})
  .then(response => response.json())
  .then(data => console.log(data))
```

## HEAD.

HEAD puxa apenas os headers. É uma requisição mais leve pois não puxa o body.

```js
const url = 'https://jsonplaceholder.typicode.com/posts/1/'

fetch(url, {
  method: 'HEAD'
}).then(response => {
  response.headers.forEach(console.log)
  console.log(response.headers.get('Content-Type'))
})
```

## Headers.

- Cache-Control.

  - Tempo que o arquivo deve ficar cache em segundos. Ex: public, max-age=3600

- Content-Type.

  - Tipo de conteúdo. Ex: text/html; charset=utf-8. Indica o tipo de arquivo principalmente em métodos POST e PUT.

- Lista de Headers.

  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

## CORS.

Cross-Origin Resource Sharing, gerencia como deve ser o compartilhamento de recursos entre diferente origens. É definido no servidor se é permitido ou não o acesso dos recursos através de scripts por outros sites. Utilizando o Access-Control-Allow-Origin.

Se o servidor não permitir o acesso, este será bloqueado. É possível passar por cima do bloqueio utilizando um proxy. CORS é um acordo entre browser / servidor ou servidor / servidor. Ele serve para dar certa proteção ao browser, mas não é inviolável.

```js
const url = 'https://cors-anywhere.herokuapp.com/https://www.google.com/'
const div = document.createElement('div')

fetch(url)
  .then(response => response.text())
  .then(data => {
    div.innerText = data
    console.log(data)
  })
```

# Async e Await.

## async/await.

A palavra chave **async** indica que a função possui partes assíncronas e que você pretende esperar a resolução da mesma antes de continuar. O **await** irá indicar a promise que devemos esperar. Faz parte do ES8.

```js
async function puxarDados() {
  const dadosResponse = await fetch('./dados.json')
  const dadosJSON = await dadosResponse.json()

  document.body.innerText = dadosJSON.titulo
}
puxarDados()
```

## then / async.

A diferença é uma sintaxe mais limpa.

```js
function iniciarFetch() {
  fetch('./dados.json')
    .then(dadosResponse => dadosResponse.json())
    .then(dadosJSON => {
      document.body.innerText = dadosJSON.titulo
    })
}
iniciarFetch()
```

```js
async function iniciarAsync() {
  const dadosResponse = await fetch('./dados.json')
  const dadosJSON = await dadosResponse.json()
  document.body.innerText = dadosJSON.titulo
}
iniciarAsync()
```

## Try / Catch.

Para lidarmos com erros nas promises, podemos utilizar o **try** e o **catch** na função.

```js
async function puxarDados() {
  try {
    const dadosResponse = await fetch('./dados.json')
    const dadosJSON = await dadosResponse.json()
    document.innerText = dadosJSON.titulo
  } catch (erro) {
    console.log(erro)
  }
}
puxarDados()
```

## Iniciar Fetch ao Mesmo Tempo.

Não precisamos esperar um fetch para começar o outro. Porém precisamos esperar a resposta devolvida do fetch para transformar a response em _json_.

```js
async function iniciarAsync() {
  const dadosResponse = fetch('./dados.json')
  const clientesResponse = fetch('./clientes.json')

  // ele espera o que está dentro da expressão () ocorrer primeiro

  const dadosJSON = await (await dadosResponse).json()
  const clientesJSON = await (await clientesResponse).json()
}

iniciarAsync()
```

## Promise.

O resultado da expressão à frente do await tem que ser uma promise. E o retorno do await será sempre o resultado desta promise.

```js
async function asyncSemPromise() {
  // console.log() não irá aparecer...

  await setTimeout(() => console.log('Depois de 1s'), 1000)
  console.log('Acabou')
}

asyncSemPromise()

async function iniciarAsync() {
  await new Promise(resolve => {
    setTimeout(() => resolve(), 1000)
  })
  console.log('Depois de 1s')
}
iniciarAsync()
```
