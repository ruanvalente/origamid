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
