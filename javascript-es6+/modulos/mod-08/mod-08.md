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

> [Para saber mais sobre Closure](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Closures)

# Destructuring.

Permite a desestruturação de Arrays e Objetos. Atribuindo suas propriedades à novas variáveis.

```js
const carro = {
  marca: 'Fiat',
  ano: 2018,
  portas: 4
}

const { marca, ano, porta } = carro

console.log(marca) // 'Fiat'
console.log(ano) // 2018
console.log(portas) // 4
```

## Destructuring Object.

A desestruturação irá facilitar a manipulação de dados. Principalmente quando temos uma grande profundidade de objetos.

```js
const clientes = {
  nome: 'Ruan',
  compras: {
    digitais: {
      livros: ['Livro 1', 'Livro 2'],
      videos: ['Videos JS', 'Videos HTML']
    },
    fisicas: {
      cadernos: ['Caderno 1']
    }
  }
}

console.log(cliente.compras.digitais.livros)
console.log(cliente.compras.digitais.videos)

const { livros, videos } = cliente.compras.digitais
console.log(livros, videos) // [ 'Livro 1', 'Livro 2' ] [ 'Videos JS', 'Videos HTML' ]
```

## Nesting.

É possível aninhar uma desestruturação dentro de outra.

```js
const cliente = {
  nome: 'Ruan',
  compras: {
    digitais: {
      livros: ['Livro 1', 'Livro 2'],
      videos: ['Video JS', 'Video HTML']
    },
    fisicas: {
      cadernos: ['Caderno 1']
    }
  }
}

const {
  fisicas,
  digitais,
  digitais: { livros, videos }
} = cliente.compras

console.log(fisicas)
console.log(livros)
```

## Nome das variáveis.

É necessário indicar o nome da propriedade que você deseja desestruturar de um objeto. É possível mudar o nome da variável final com:

```js
const cliente = {
  nome: 'Ruan',
  compras: 10
}
const { nome, compras } = cliente
// ou
const { nome: nomeCliente, compras: comprasCliente } = cliente
```

## Valor inicial.

Caso a propriedade não exista o valor padrão dela será **undefined**. É possível modificar este valor no momento da desestruturação.

```js
const cliente = {
  nome: 'Ruan',
  compras: 10
}
const { nome, compras, email = 'email@gmail.com', cpf } = cliente
console.log(email) // email@gmail.com
console.log(cpf) // undefined
```

## Destructuring Arrays.

Para desestruturar array's você deve colocar as variáveis entre **[]** colchetes.

```js
const frutas = ['Banana', 'Uva', 'Morango']
const primeiraFruta = frutas[0]
const segundaFruta = frutas[1]
const terceiraFruta = frutas[2]

// Com destructuring
const [primeira, segunda, terceira] = frutas
```

## Declaração de variáveis.

A desestruturação pode servir para declararmos uma sequência de variáveis.

```js
const primeiro = 'Item 1'
const segundo = 'Item 2'
const terceiro = 'Item 3'

// ou
const [primeiro, segundo, terceiro] = ['Item 1', 'Item 2', 'Item 3']
```

## Argumentos Desestruturados.

Se uma função espera receber como argumento um objeto, podemos desestruturar ele no momento da declaração.

```js
function handleKeyboard(event) {
  console.log(event.key)
}
// Com Destructuring
function handleKeyboard({ key }) {
  console.log(key)
}
document.addEventListener('keyup', handleKeyboard)
```

## Exercícios.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Desestruturação</title>
    <style>
      button {
        background: rebeccapurple;
      }
    </style>
  </head>
  <body>
    <button>Botão</button>
    <script src="exer.js"></script>
  </body>
</html>
```

```js
// Extraia o backgroundColor, color e margin do btn
const btn = document.querySelector('button')
const btnStyles = getComputedStyle(btn)
const { backgroundColor, color, margin } = btnStyles
console.log(backgroundColor, color, margin)

// Troque os valores das variáveis abaixo

let cursoAtivo = 'JavaScript'
let cursoInativo = 'HTML'

;[cursoAtivo, cursoInativo] = [cursoInativo, cursoAtivo]

console.log(cursoAtivo, cursoInativo)

// Corrija o erro abaixo
const cachorro = {
  nome: 'Bob',
  raca: 'Labrador',
  cor: 'Amarelo'
}
const { cor: bobCor } = cachorro

console.log(bobCor)
```

# Rest e Spread.

## Parâmetros.

Nem todos os parâmetros que definimos são utilizados quando uma função é executada, devido a falta de argumentos.

Por isso é importante nos prepararmos para caso estes argumentos não sejam declarados.

```js
function perimetroForma(lado, totalLados) {
  return lado * totalLados
}
perimetroForma(10, 4) // 40
perimetroForma(10) // NaN
```

## Parâmetro Padrão (Default - ES5).

Antes do ES6 a forma de definimos um valor padrão para um parâmetro, era através de uma expressão.

```js
function perimetroForma(lado, totalLados) {
  totalLados = totalLados || 4 // se não for definido, será igual à 4
  return lado * totalLados
}
perimetroForma(10, 3) // 30
perimetroForma(10) // 40
```

## Parâmetro Padrão (Default - ES6+).

Com o ES6 é possível definirmos o valor de um parâmetro direito na declaração do mesmo, caso o argumento não seja passado no momento da execução.

```js
function perimetroForma(lado, totalLados = 4) {
  return lado * totalLados
}
perimetroForma(10, 5) // 50
perimetroForma(10) // 40
```

## Arguments.

A palavra chave **arguments** é um objeto array-like criado detro da função. Esse objeto contém os valores dos argumentos.

```js
function perimetroForma(lado, totalLados = 4) {
  console.log(arguments)
  return lado * totalLados
}
perimetroForma(10)
perimetroForma(10, 4, 20)
```

## Parâmetro Rest.

É possível declararmos um parâmetro rest utilizando **...** na frente do mesmo. Assim todos os argumentos que passarmos na ativação da função, ficarão dentro do parâmetro.

```js
function anunciarGanhadores(...ganhadores) {
  ganhadores.forEach(ganhador => {
    console.log(ganhador + ' ganhou.')
  })
}
anunciarGanhadores('Pedro', 'Marta', 'Maria')
```

## Único Rest.

Só é possível ter um único parâmetro rest e ele deve ser o último.

```js
function anunciarGanhadores(premio, ...ganhadores) {
  ganhadores.forEach(ganhador => {
    console.log(ganhador + ' ganhou um ' + premio)
  })
}
anunciarGanhadores('Carro', 'Pedro', 'Marta', 'Maria')
```

## Rest VS Arguments.

Apesar de parecido o parâmetro rest e a palavra arguments possuem grandes diferenças. Sendo rest uma array real e arguments um objeto array-like.

```js
function anunciarGanhadores(premio, ...ganhadores) {
  console.log(ganhadores)
  console.log(arguments)
}
anunciarGanhadores('Carro', 'Pedro', 'Marta', 'Maria')
```

## Operador Spread.

Assim como o rest, o operador Spread também utiliza os **...** para ser ativado. O Spread irá distribuir um item iterável, um por um.

```js
const frutas = ['Banana', 'Uva', 'Morango']
const legumes = ['Cenoura', 'Batata']

const comidas = [...frutas, 'Pizza', ...legumes]
```

## Spread Argument.

O Spread pode ser muito útil para funções que recebem uma lista de argumentos ao invés de uma array.

```js
const numeroMaximo = Math.max(4, 5, 20, 10, 30, 2, 33, 5) // 33
const listaNumeros = [1, 13, 21, 12, 55, 2, 3, 43]
const numeroMaximoSpread = Math.max(...listaNumeros)
```

## Transformando em Array.

É possível transformar itens iteráveis em uma array real com o spread.

```js
const btns = document.querySelectorAll('button')
const btnsArray = [...btns]
const frase = 'Isso é JavaScript'
const fraseArray = [...frase]
```

## Exercícios.

```js
// Reescreva a função utilizando
// valores iniciais de parâmetros com ES6

function createButton(background = 'blue', color = 'red') {
  const buttonElement = document.createElement('button')
  buttonElement.style.background = background
  buttonElement.style.color = color
  return buttonElement
}

const redButton = createButton()

console.log(redButton)

// Utilize o método push para inserir as frutas ao final de comidas.

const frutas = ['Banana', 'Uva', 'Morango']
const comidas = ['Pizza', 'Batata']

comidas.push(...frutas)
console.log(comidas)
```

# Loops e Iterable.

# Iterable.

São objetos que possuem o método **[Symbol.iterator]**, geralmente no protótipo, é dentro dele que a função que lida com a iteração será definida. Ex: Array, String, NodeList, boa parte das Array-Like e outros.

```js
const frutas = ['Banana', 'Morango', 'Uva']
const frase = 'Isso é JavaScript'

fetch('https://pokeapi.co/api/v2/pokemon/').then(({ headers }) =>
  console.log(headers)
)
```

## For...of.

É possível fazemos um loop por cada iteração do objeto iterável utilizando o for...of. Além deste loop podemos também utilizar o Spread Operator nos mesmos.

```js
const frutas = ['Banana', 'Morango', 'Uva']
const frase = 'Isso é JavaScript'

for (const fruta of frutas) {
  console.log(fruta)
}
for (const char of frase) {
  console.log(char)
}
```

## Spread e for...of.

Com o for loop podemos manipular cada um dos elementos do objeto iterável.

```js
const buttons = document.querySelectorAll('button')
for (const btn of buttons) {
  btn.style.background = 'blue'
}
console.log(...buttons)
```

## Apenas Iteráveis.

O for...of não irá funcionar em um objeto comum que não seja iterável.

```js
const carro = {
  marca: 'Honda',
  ano: 2018
}
// Erro, não é Iterável
for (const propriedade of carro) {
  console.log(propriedade)
}
```

## For...in.

Este loop irá retornar a chave (key) de todas as propriedades enumeráveis (que sejam símbolos) de um objeto.

```js
const carro = {
  marca: 'Honda',
  ano: 2018
}
for (const propriedade in carro) {
  console.log(propriedade)
}
```

## Array e for...in.

Um array é um objeto, porém a chave de cada valor é igual ao seus index.

```js
const frutas = ['Banana', 'Morango', 'Uva']
for (const index in frutas) {
  console.log(index)
}
for (const index in frutas) {
  console.log(frutas[index])
}
```

## Chave e valor.

Utilizando o for...in podemos retornar todas as chaves e valores de propriedades enumeráveis.

```js
const btn = document.querySelector('button')
const btnStyles = getComputedStyle(btn)
for (const style in btnStyles) {
  console.log(`${style}: ${btnStyles[style]}`)
}
```

## Do / While.

Outro tipo de loop é Do / While. Não é muito utilizado.

```js
let i = 0
do {
  console.log(i++)
} while (i <= 5)
```
