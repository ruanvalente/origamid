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

```js
// Utilizando a API https://viacep.com.br/ws/${CEP}/json/
// crie um formulário onde o usuário pode digitar o cep
// e o endereço completo é retornado ao clicar em buscar

// Utilizando a API https://blockchain.info/ticker
// retorne no DOM o valor de compra da bitcoin and reais.
// atualize este valor a cada 30s

// Utilizando a API https://api.chucknorris.io/jokes/random
// retorne uma piada randomica do chucknorris, toda vez que
// clicar em próxima
```
