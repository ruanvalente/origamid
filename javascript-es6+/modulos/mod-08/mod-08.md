# Function Expression.

## Function Declaration.

São duas formas mais comuns de declaramos uma função. A que utilizamos até o momento é chamada de Function Declaration.

```js
function somar(a, b) {
  return a + b
}

somar(2, 4) // 6
```

## Function Expression.

É criada a partir da declaração de uma variável, na qual assinalamos uma função. Esta função pode ser anônima ou nomeada. A mesma poderá ser ativada através da variável assinalada.

```js
const somar = function(a, b) {
  return a + b
}

somar(2, 4) // 6
```

## Hoisting.

Function Declaration são completamente definidas no momento do hoisting, já function expression apenas serão definidas no momento da execução. Por isso a ordem da declaração de uma FE possui importância.

```js
somar(4, 2) // 6
dividir(4, 2) // erro

function somar(a, b) {
  return a + b
}

const dividir = function(a, b) {
  return a / b
}
```

## Arrow Function.

Podemos criar utilizando arrow functions.

```js
const somar = (a, b) => a + b
console.log(somar(1, 2)) // 3

const dividir = (a, b) => a / b
console.log(dividir(2, 2)) // 0
```

## Estrutura / Preferência.

Geralmente o uso entre expression / declaration é uma questão de preferência. Function expression força a criação da mesma antes de sua ativação, o que pode contribuir para um código mais estruturado.

```js
// Declarada como método de window
// vaza o escopo de bloco, como se
// fosse criada utilizando var

function somar(a, b) {
  return a + b
}
const dividir = (a, b) => a / b
somar(4, 2)
dividir(4, 2)
```

## IIFE - Immediately Invoked Function Expression.

Antes da introdução de modules e implementação do escopo de bloco, a forma mais comum utilizada para isolarmos o escopo de um código Javascript era através das chamadas IIFE's.

```js
var instrumento = 'Violão'
;(function() {
  // código isolado do escopo local
  var instrumento = 'Guitarra'
  console.log(instrumento) // Guitarra
})()
console.log(instrumento) // Violão
```

## IIFE - Arrow Function.

Compiladores ainda transformam modules em IIFE's para manter a compatibilidade com browsers antigos.

```js
const instrumento = 'Guitarra'
;(() => {
  const instrumento = 'Violão'
  console.log(instrumento) // 'Violão'
})()
console.log(instrumento) // 'Guitarra'
```

## Exercícios.

```js
// Remova o erro
const priceNumber = n => +n.replace('R$', '').replace(',', '.')
priceNumber('R$ 99,99')

// Crie uma IIFE e isole o escopo de qualquer código JS.
;(() => {
  const course = 'Curso Javascript ES6+'
  console.log(course)
})()
// console.log(course)

// Como podemos utilizar a função abaixo.
const active = callback => callback()
active(() => console.log('Active'))
```

# Factory Function.

São funções que retornam um objeto sem a necessidade de utilizarmos a palavra chave new. Possuem basicamente a mesma função que constructor functions / classes.

```js
function createButton(text) {
  function element() {
    const $buttonElement = document.createElement('button')
    $buttonElement.innerText = text
    return $buttonElement
  }

  return {
    element: element
    text: text
  }
}

const button = createButton('Comprar')
```

## Métodos / Variáveis privadas.

Uma das vantagens é a possibilidade de criarmos métodos / variáveis privadas.

```js
function criarPessoa(nome, sobrenome) {
  const nomeCompleto = `${nome} ${sobrenome}`

  function andar() {
    return `${nomeCompleto} andou`
  }

  function nadar() {
    return `${nomeCompleto} nadou`
  }

  return {
    nome,
    sobrenome,
    andar,
    nadar
  }
}

const ruan = criarPessoa('Ruan', 'Valente')
```

## Ice Factory.

Podemos impedir que os métodos e propriedades sejam modificados com **Object.freeze()**. Ideia inicial de **Douglas Crockford**.

```js
'use strict'

function criarPessoa(nome, sobrenome) {
  const nomeCompleto = `${nome} ${sobrenome}`

  function andar() {
    return `${nomeCompleto} andou`
  }

  return Object.freeze({
    nome,
    sobrenome,
    andar
  })
}

const ruan = criarPessoa('Ruan', 'Valente')
```

## Constructor Function / Factory Function.

Uma das vantagens da Factory Function é a possibilidade de iniciarmos a mesma sem a utilização da palavra chave new. Também é possível fazer isso com uma Constructor Function.

```js
function Pessoa(nome) {
  if (!(this instanceof Pessoa)) {
    return new Pessoa(nome)
  }
  this.nome = nome

  Pessoa.prototype.andar = function() {
    return `${this.nome} andou.`
  }
}

const ruan = Pessoa('Ruan')
```

## Exemplo real.

Uma versão básica de algumas funções do jQuery.

```js
function $(selectedElements) {
  const elements = document.querySelectorAll(selectedElements)

  function on(onEvent, callback) {
    elements.forEach(element => {
      element.addEventListener(onEvent, callback)
    })
    return this
  }

  function hide() {
    elements.forEach(element => {
      element.style.display = 'none'
    })
    return this
  }

  function show() {
    elements.forEach(element => {
      element.style.display = 'initial'
    })
    return this
  }

  function addClass(className) {
    elements.forEach(element => {
      elements.classList.add(className)
    })
    return this
  }

  function removeClass(className) {
    elements.forEach(element => {
      elements.classList.remove(className)
    })
    return this
  }

  return Object.freeze({
    elements,
    on,
    hide,
    addClass,
    removeClass
  })
}

const buttons = $('button')
buttons
  .hide()
  .show()
  .addClass('ativo')
  .removeClass('ativo')
```

# Closures e Debugging.

## Escopo.

Quando criamos uma função, a mesma possui acesso à todas as variáveis criadas em seu escopo e também ao escopo pai. A mesma coisa acontece para funções dentro de funções.

```js
let item = 1

function funcao1() {
  let item2 = 2
  function funcao2() {
    let item3 = 3
  }
}

// func1, possui acesso à
// item1 e item2
// func2, possui acesso à
// item1, item2 e item3
```

## Closures.

A **funcao2** possui 4 escopos. O primeiro escopo é o Local, com acesso ao item3. O segundo escopo dá acesso ao item2, esse escopo é chamado de Closure (funcao1) (escopo de função dentro de função). O terceiro escopo é o Script com acesso ao item1 e o quarto escopo é o Global/Window.

```js
let item1 = 1
function funcao1() {
  let item2 = 2
  function funcao2() {
    let item3 = 3
    console.log(item1)
    console.log(item2)
    console.log(item3)
  }
  funcao2()
}
```

## Debugging.

É possível "debugarmos" um código Javascript utilizando ferramentas do browser ou através do próprio Visual Studio Code. Se o código possuir qualquer Web API, o processo deve ser feito no Browser. Plugins podem interferir no debug dentro do browser.

```js
debugger // adicione a palavra debugger
let item1 = 1
function funcao1() {
  let item2 = 2
  function funcao2() {
    let item3 = 3
    console.log(item1)
    console.log(item2)
    console.log(item3)
  }
  funcao2()
}
```

## Caso Clássico.

Um dos casos mais clássicos para a demonstração de Closures é através de criação de uma função de incremento. É como se a função incrementar carregasse uma mochila chamada contagem, onde uma referência para as suas variáveis estão contidas na mesma.

```js
function contagem() {
  let total = 0
  return function incrementar() {
    total++
    console.log(total)
  }
}
const ativarIncrementar = contagem()
ativarIncrementar() // 1
ativarIncrementar() // 2
ativarIncrementar() // 3
```

## Closure na Real.

Todas as funções internas da Factory Function possuem uma closure de **\$**. As mesmas contém uma referência à variável elements declarada dentro do escopo da função.

```js
function $$(selectedElements) {
  const elements = document.querySelectorAll(selectedElements)
  function hide() {
    // ...
  }
  function show() {
    // ...
  }
  function on() {
    // ...
  }
  function addClass() {
    // ...
  }
  function removeClass() {
    // ...
  }
  return { hide, show, on, addClass, removeClass }
}
```
