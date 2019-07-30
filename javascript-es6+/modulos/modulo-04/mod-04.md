# Objetos

## Constructor Functions.

### Objetos.

Criar um objeto é simples, basta definirmos uma variável e iniciar a definição do seu valor com chaves **{}**. Mas e se precisamos criar um novo objeto, com as mesmas características do anterior? É possível com o **Object.create**, porém veremos isso mais adiante.

```js
const carro = {
  marca: 'Marca',
  preco: 0
}

const honda = carro
honda.marca = 'Honda'
honda.preco = 4000

const fiat = carro
fiat.marca = 'Fiat'
fiat.preco = 3000
```

> Carro, fiat e honda apontam para o mesmo objeto.

### Constructor Functions.

Para isso existem as **Constructor Functions**, ou seja **Funções Construtoras** que são responsáveis por construir novos objetos sempre que chamamos as mesmas.

```js
function Carro() {
  this.marca = 'Marca'
  this.preco = 0
}

const honda = new Carro()
honda.marca = 'Honda'
honda.preco = 4000
const fiat = new Carro()
fiat.marca = 'Fiat'
fiat.preco = 3000
```

> A anotação para esse tipo de função é Pascal Case, onde a primeira letra é maiúscula.

### new Keyword.

A palavra chave **new** é responsável por criar um novo objeto baseado na função que passarmos a frente dela.

```js
const honda = new Carro()
// 1 Cria um novo objeto
honda = {}

// 2 Define o protótipo
honda.prototype = Carro.prototype

// 3 Aponta a variável this para o objeto
this = honda

// 4 Executa a função, substituindo this pelo objeto
honda.marca = 'Marca'
honda.preco = 0

// 5 Retorna o novo objeto

return honda = {
  marca: 'Marca',
  preco: 0
}
```

### Parâmetros e Argumentos.

Podemos passar argumentos que serão utilizados no momento da criação do objeto.

```js
function Carro(marca, preco) {
  this.marca = marca
  this.preco = preco
}

const honda = new Carro('Honda', 4000)
const fiat = new Carro('Fiat', 3000)
```

### this Keyword.

O **this** faz referência ao própprio objeto construído com a Constructor Function.

```js
function Carro(marca, precoInicial) {
  const taxa = 1.2
  const precoFinal = precoInicial * taxa
  this.marca = marca
  this.preco = precoFinal
  console.log(this)
}

const honda = new Carro('Honda', 2000)
```

> Variáveis dentro da Constructor estão "protegidas"

### Exemplo real.

Quando mudamos a propriedade seletor, o objeto DOM irá passar a selecionar o novo seletor em seus métodos.

```js
const DOM = {
  seletor: 'li',
  element() {
    return document.querySelector(this.seletor)
  },
  ativo() {
    this.element().classList.add('ativo')
  }
}
DOM.ativo() // adiciona a class ativo ao li
DOM.seletor = 'ul'
DOM.ativo() // adiciona a class ativo ao ul
```

### Constructor Function Real.

Um objeto criado com uma Constructor, não irá influenciar em outro objeto criado com a mesma Constructor.

```js
function DOM() {
  this.seletor = 'li'
  const element = document.querySelector(this.seletor)
  this.ativo = function() {
    element.classList.add('ativo')
  }
}

const lista = new DOM()
lista.seletor('ul')
lista.ativo()

const lastLi = new DOM()
lastLi.seletor = 'li:last-child'
lastLi.ativo()
```

> Lembre-se de usar parâmetros.

```js
function DOM(seletor) {
  const element = document.querySelector(seletor)
  this.ativo = function(classe) {
    element.classList.add(classe)
  }
}

const lista = new DOM('ul')
lista.ativo('ativo')

const lastLi = new DOM('li:last-child')
lastLi.ativo('ativo')
```

### Exercícios.

```js
// Transforme o objeto abaixo em uma Constructor Function
const pessoa = {
  nome: 'Nome Pessoa',
  idade: 0,
  andar() {
    console.log(this.nome + ' andou')
  }
}

function Person(name, age) {
  this.name = name
  this.age = age

  this.andar = function() {
    console.log(this.name + ' andou')
  }
}
// Crie 3 pessoas, João - 20 anos, Maria - 25 anos, Bruno - 15 anos
const joao = new Person('João', 20)
const maria = new Person('Maria', 25)
const bruno = new Person('Bruno', 15)

// Crie uma Constructor Function (DOM) para manipulação de listas de elementos do DOM. Deve Conter as seguintes propriedades e métodos.

/// Elements: Retorna uma NodeList com os elementos selecionados
// AddClass(classe): Adiciona a classe a todos os elementos
// removeClass(classe): Remove a classe a todos os elementos.

function DOM(selector) {
  const elementList = document.querySelectorAll(selector)
  this.element = elementList
  this.addClass = function addClass(classe) {
    element.forEach(element => element.classList.add(classe))
  }
  this.removeClass = function removeClass(classe) {
    element.forEach(element => element.classList.remove(classe))
  }
}

const $li = new DOM('li')
$li.addClass('active')
$li.removeClass('active')
```

## Prototype.

A propriedade prototype é um objeto adicionado a uma função quando a mesma é criada.

```js
function Pessoa(nome, idade) {
  this.nome = nome
  this.idade = idade
}

const ruan = new Pessoa('Ruan', 24)

console.log(Pessoa.prototype) // retorna o objeto
console.log(ruan.prototype) // undefined
```

## funcao.prototype.

É possível adicionar novas propriedades e métodos ao objeto prototype.

```js
Pessoa.prototype.andar = function() {
  return this.nome + ' andou'
}

Pessoa.prototype.nadar = function() {
  return this.nome + ' nadou'
}

console.log(Pessoa.prototype) // retorna o objeto
```

## Acesso ao Protótipo.

O objeto criado utilizando o construtor, possui acesso aos métodos e propriedades ao protótipo deste construtor. Lembrando, prototype é uma propriedade de função apenas.

```js
const ruan = new Pessoa('Ruan', 24)

ruan.nome
ruan.idade
ruan.andar()
ruan.nadar()
```

## proto

O novo objeto acessa os métodos e propriedades do protótipo através da propriedade **proto**. É o papel da engine fazer essa busca, não devemos falar com **proto** diretamente.

```js
// Acessam o mesmo método, mas __proto__ não terá acesso ao this.nome
ruan.andar()
ruan.__proto__.andar()
```

## Herança de Protótipo.

O objeto possui acesso aos métodos e propriedades do protótipo do construtor responsável por criar este objeto. O objeto abaixo possui acesso a métodos que nunca definimos, mas são herdados do protótipo de **Object**.

```js
Object.prototype
ruan.toString()
ruan.isPrototypeOf()
ruan.valueOf()
```

## Construtores Nativos.

Objetos, Funções, Números, Strings e outros tipos de dados são criados utilizando construtores. Esses contrutores possuem um protótipo com propriedade e métodos, que poderão ser acessadas pelo tipo de dado.

```js
const pais = 'Brasil'
const cidade = new String('Pará')

pais.charAt(0) // B
cidade.charAt(0) // P

String.prototype
```

## É possível acessar a função do protótipo.

É comum, principalmente em códigos mais antigos, o uso direto de funções do protótipo do construtor Array.

```js
const lista = document.querySelectorAll('li')

// Transforma em uma Array.
const listaArray = Array.prototype.slice.call(lista)
```

> Existe o método Array.from(), que faz o mesmo processo em transforma um Array like para Array.

## Método do Objeto vs Protótipo.

Nos objetos nativos existem métodos linkados diretamente ao Objeto e outros linkados ao protótipo.

```js
Array.prototype.slice.call(lista)
Array.from(lista)

// Retorna uma lista com os métodos / propriedades.
Object.getOwnPropertyNames(Array)
Object.getOwnPropertyNames(Array.prototype)
```

> dado.constructor.name, retorna o nome do constructor.

## Apenas os métodos do protótipo são herdados.

```js
const list = [1, 2, 3].slice() // existe
const list2 = [1, 2, 3].from() // não existe
```

## Entenda o que está sendo retornado.

Os métodos e propriedades acessados com o **.** são referentes ao tipo de dados que é retornado antes desse **.**

```js
const Carro = {
  marca: 'Ford',
  preco: 2000,
  acelerar() {
    return true
  }
}

Carro // Object
Carro.marca // String
Carro.acelerar // Function
Carro.acelerar() // Boolean
Carro.marca.charAt // Function
Carro.marca.charAt(0) // String
```

> Verifique o nome do construtor.

```js
// Crie uma função construtora de Pessoas, deve conter nome, sobrenome e idade.
// Crie um método no protótipo que retorne o nome completo da pessoa.

function Person(name, lastName, age) {
  this.name = name
  this.lastName = lastName
  this.age = age
}

Person.prototype.fullName = function fullName() {
  return this.name + ' ' + this.lastName
}

const ruan = new Person('Ruan', 'Valente', 24)
console.log(ruan.fullName())

// Liste os métodos acessados por dados criados com NodeList, HTMLCollection, Document.
function listMethods(method) {
  return Object.getOwnPropertyNames(method.prototype)
}
console.log(listMethods(NodeList))
console.log(listMethods(HTMLCollection))
console.log(listMethods(Document))

// Liste os construtores dos dados abaixo.
const li = document.querySelector('li')
li // "HTMLLIElement"
li.click // "Function"
li.innerText // "String"
li.value // "Number"
li.hidden // "Boolean"
li.offsetLeft // "Number"
li.click() // // undefined

// Qual o construtor do dado abaixo:
li.hidden.constructor.name // "String
```

## Native, Host e User.

### Native.

Objetos nativos são aqueles definidos na especificação da linguagem e são implementantados independente do host.

```js
// Construtores de Objetos Nativos.

Object
String
Array
Function
```

### Host.

Objetos do host são aqueles implementados pelo próprio ambiente. Por exemplo no browser possuímos objetos do DOM, como DomList, HTMLCollection e outros. Em NodeJS os objetos host são diferentes, já que não estamos em um ambiente do browser.

```js
// Objetos do browser
NodeList
HTMLCollection
Element
```

## User.

Objetos do user, são os objetos definidos pelo seu aplicativo. Ou seja, qualquer objeto que você criar ou que importar de alguma biblioteca externa.

```js
const pessoa = { nome: 'Ruan' }
```

## Diferentes Versões.

### Browsers diferentes.

Apesar de tentarem ao máximo manter um padrão, browsers diferentes possuem objetos com propriedades e métodos diferentes.

### Versões de browsers.

Sempre que o browser é atualizado, novos objetos, métodos e propriedades podem ser implementados.

### Host e Native Objects.

Por exemplo, browsers que não implementaram o ECMAScript 2015 (ES6), não possuem o método nd de Array.

## Versões de JavaScript.

### ECMA.

Organização responsável por de nir padrões para tecnologias. ECMAScript é o padrão de JavaScript.

### ECMAScript 2015 ou ES6.

ES é uma abreviação de ECMAScript, ES6 é a sexta versão do ECMAScript, que foi lançada em 2015. Por isso ECMAScript 2015 é igual a ES6. A partir da ES6, existe uma tendência anual de atualizações. ECMAScript 2015, 2016, 2017, 2018 e Next.

### Engine.

Existem diversas engines que implementam o ECMAScript como V8, SpiderMonkey, Chakra, JavaScriptCore e mais.

## Bibliotecas.

Bibliotecas como jQuery foram criadas para resolver o problema de inconsistências entre browsers e adicionar funcionalidades que não existiam nativamente. A padronização dos browsers e a implementação de soluções nativas, torna as mesmas obsoletas.

```js
$('a').addClass('ativo')
$('a').hide()
$('a').show()
```

## Verifica se existe.

O typeof retorna o tipo de dado. Caso esse dado não exista ou não tenha sido definido, ele irá retornar undefined. Ou seja, quando não for undefined quer dizer que existe.

```js
if (typeof Array.from !== 'undefined') {
  // ...
}
if (typeof NodeList !== 'undefined') {
  // ...
}
```

## API.

Application Programming Interface, é uma interface de software criada para a interação com outros softwares. Ou seja, toda interação que fazemos com o browser utilizando Objetos, Métodos e Propriedades, estamos na verdade interagindo com a API do browser.

## Exercícios.

```js
// Liste 5 objetos nativos
String
Function
Boolean
Number
Array
// Liste 5 objetos do browser
Window
HTMLCollection
localStorage
NodeList
History
// Liste 2 Métodos, Propriedades ou Objetos
// presentes no Chrome que não existem no Firefox
if (
  typeof window.webkitMediaStream &&
  typeof window.webkitSpeechGrammar !== 'undefined'
) {
  console.log('tem')
} else {
  console.log('Não tem')
}
```

## Strings

É a construtora de string, toda string possui as propriedades e métodos do prototype de String.

```js
const comida = 'Pizza'
const liquido = new String('Água')
const ano = new String(2018)
```

## str.length.

Propriedade com o total de caracteres da string.

```js
const comida = 'Pizza'
const frase = 'A melhor comida'
comida.length // 5
frase.length // 15
comida[0] // P
frase[0] // A
frase[frase.length - 1] // a
```

## str.charAt(n).

Retorna o caractere de acordo com o index de (n).

```js
const linguagem = 'JavaScript'
linguagem.charAt(0) // J
linguagem.charAt(2) // v
linguagem.charAt(linguagem.length - 1) // t
```

## str.concat(str1, str2...).

Concatena as strings e retorna o resultado.

```js
const frase = 'A melhor linguagem é '
const linguagem = 'JavaScript'
const fraseCompleta = frase.concat(linguagem, '!!')
```

## str.includes(search, position).

Procura pela string exata dentro de outra string. A procura é case sensitive.

```js
const fruta = 'Banana'
const listaFrutas = 'Melancia, Banana, Laranja'
listaFrutas.includes(fruta) // true
fruta.includes(listaFrutas) // false
```

## str.endsWith(search) e str.startWith(search).

Procura pela string exata dentro de outra string. A procura é case sensitive.

```js
const fruta = 'Banana'
fruta.endsWith('nana') // true
fruta.startsWith('Ba') // true
fruta.startsWith('na') // false
```

## str.slice(start, end).

Corta a string de acordo com os valores de start e end.

```js
const transacao1 = 'Depósito de cliente'
const transacao2 = 'Depósito de fornecedor'
const transacao3 = 'Taxa de camisas'
transacao1.slice(0, 3) // Dep
transacao2.slice(0, 3) // Dep
transacao3.slice(0, 3) // Tax
transacao1.slice(12) // cliente
transacao1.slice(-4) // ente
transacao1.slice(3, 6) // ósi
```

## str.substring(start, end).

Corta a string de acordo com os valores de start e end. Não funciona com valores negativos como o slice.

```js
const linguagem = 'JavaScript'
linguagem.substring(3, 5) // aS
linguagem.substring(0, 4) // Java
linguagem.substring(4) // Script
linguagem.substring(-3) // JavaScript
```

## str.indexOf(search) e str.lastIndexOf(search).

Retorna o index da string, assim que achar a primeira ocorrência e a mesma é retornada. No caso do lastIndexOf, é retornado a última ocorrência.

```js
const instrumento = 'Guitarra'
instrumento.indexOf('r') // 5
instrumento.lastIndexOf('r') // 6
instrumento.indexOf('ta') // 3
```

## str.padStart(n, str) e str.padEnd(n, str).

Aumenta o tamanho da string para o valor de n. Ou seja, uma string com 8 caracteres, se passarmos n = 10, ela passará a ter 10 caracteres. O preenchimento é feito com espaços, caso não seja declarado o segundo argumento.

```js
const listaPrecos = ['R$ 99', 'R$ 199', 'R$ 12000']

listaPrecos.forEach(preco => {
  console.log(preco.padStart(10, '.'))
})

listaPrecos[0].padStart(10, '.') // .....R$ 99
listaPrecos[0].padEnd(10, '.') // R$ 99.....
```

## str.repeat(n).

Repete a string (n) vezes.

```js
const frase = 'Ta'
frase.repeat(5) // TaTaTaTaTa
```

## str.replace(regex|substr, newstr|function).

Troca partes da string por outra. Podemos utilizar uma regular expression ou um valor direto. Se usarmos um valor direto ele irá trocar apenas o primeiro valor que encontrar.

```js
let listaItens = 'Camisas Bonés Calças Bermudas Vestidos Saias'

listaItens = listaItens.replace(/[ ]+/g, ', ')

let preco = 'R$ 1200,43'
preco = preco.replace(',', '.') // 'R$ 1200.43'
```

## str.split(padrao).

Divide a string de acordo com o padrão passado e retorna uma Array.

```js
const listaItens = 'Camisas Bonés Calças Bermudas Vestidos Saias'
const arrayItens = listaItens.split(' ')
const htmlText = '<div>O melhor item</div><div>A melhor lista</div>'
const htmlArray = htmlText.split('div')
const htmlNovo = htmlArray.join('section')
```

> join é um método de Array.

## str.toLowerCase() e str.toUpperCase().

Retorna a string em letras maiúsculas ou minúsculas. Bom para verificarmos input de usuários.

```js
const sexo1 = 'Feminino'
const sexo2 = 'feminino'
const sexo3 = 'FEMININO'
sexo1.toLowerCase() === 'feminino' // true
sexo2.toLowerCase() === 'feminino' // true
sexo3.toLowerCase() === 'feminino' // true
```

## str.trim(), str.trimStart(), str.trimEnd().

Remove espaços em branco do ínicio ou final de uma string.

```js
const valor = '  R$ 23.00   '
valor.trim() // 'R$ 23.00'
valor.trimStart() //  'R$ 23.00  '
valor.trimEnd() // '  R$ 23.00'
```

## Exercícios.

```js
// Utilizando o foreach na Array abaixo, some os valores de Taxa e os valores de Recebimento.
const transacoes = [
  {
    descricao: 'Taxa do Pão',
    valor: 'R$ 39'
  },
  {
    descricao: 'Taxa do Mercado',
    valor: 'R$ 129'
  },
  {
    descricao: 'Recebimento de Cliente',
    valor: 'R$ 99'
  },
  {
    descricao: 'Taxa do Banco',
    valor: 'R$ 129'
  },
  {
    descricao: 'Recebimento de Cliente',
    valor: 'R$ 49'
  }
]

let valorTotalTaxa = 0
let valorTotalRecebimento = 0

transacoes.forEach(transacao => {
  if (transacao.descricao.includes('Taxa')) {
    let taxa = Number(transacao.valor.replace('R$', ''))
    valorTotalTaxa += taxa
  }
  if (transacao.descricao.includes('Recebimento')) {
    let recebimento = Number(transacao.valor.replace('R$', ''))
    valorTotalRecebimento += recebimento
  }
})

console.log(valorTotalTaxa)
console.log(valorTotalRecebimento)

// Retorne uma array com a lista abaixo
const transportes = 'Carro;Avião;Trem;Ônibus;Bicicleta'
console.log(transportes.split(';'))

// Substitua todos os span's por a's
const html = `<ul>
              <li><span>Sobre</span></li>
              <li><span>Produtos</span></li>
              <li><span>Contato</span></li>
              </ul>`
console.log(html.replace(/span/g, 'a'))

// Retorne o último caracter da frase
const frase = 'Melhor do ano!'
console.log(frase[frase.length - 1])

// Retorne o total de taxas
const transacoes2 = [
  'Taxa do Banco',
  'TAXA DO PÃO',
  'taxa do mercado',
  'depósito Bancário',
  'TARIFA especial'
]
let totalDeTaxas = 0
transacoes2.forEach(transacao => {
  if (transacao.match(/taxa/gi)) {
    totalDeTaxas++
  }
})

console.log(totalDeTaxas)
```

## Number e Math.

## Number.

É a construtora de números, todo número possui as propriedades e métodos do prototypede Number. Number também possui alguns métodos.

```js
const ano = 2019
const preco = new Number(99)
```

## Number.isNaN() e Number.isInteger().

isNaN() é um método de Number, ou seja, não faz parte do protótipo. O método isInteger() determina se o valor passado é um inteiro.

```js
Number.isNaN(NaN) // true
Number.isNaN(22) // false
Number.isInteger(20) // true
Number.isInteger(23.5) // false
```

## Number.parseFloat() e Number.parseInt().

parseFloat() serve para retornarmos um número a partir de uma string. A String deve começar com um número. parseInt recebe também um segundo parâmetro que é o Randix, 10 é para decimal.

```js
parseFloat('99.50') // Mesma função sem o Number
Number.parseFloat('99.50') // 99.5
Number.parseFloat('100 Reais') // 100
Number.parseFloat('R$ 100') // NaN

parseInt('99.50', 10) // 99
parseInt(5.43434355555, 10) // 5
Number.parseInt('100 Reais', 10) // 100
```

> Float possui decimal, Integer não.

## n.toFixed(decimais).

Arredonda o número com base no total de casas decimais do argumento.

```js
const preco = 2.99
preco.toFixed() // 3

const carro = 1000.455
carro.toFixed(2) // 1000.46

const preco2 = 1499.49
preco2.toFixed() // 1499
```

## n.toString(radix).

Transforma o número em uma string com base no Radix. Use o 10 para o sistema decimal.

```js
const preco = 2.99
preco.toString(10)
```

## n.toLocaleString(lang, options).

Formata o número de acordo com a língua e opções passadas.

```js
const preco = 59.9
preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) // $59.90
preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) // R$ 59,90
```

## Math.

É um Objeto nativo que possui propriedades e métodos de expressões matemáticas comuns.

```js
Math.PI // 3.14159
Math.E // 2.718
Math.LN10 // 2.303
```

> Mais sobre o objeto [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

## Math.abs(), Math.ceil(), Math.floor() e Math.round().

O método **abs()** retorna um valor absoluto, ou seja, transforma negativo em positivo.
O método **ceil()** arrendonda para cima, retornando sempre um número inteiro e o método **floor()** para baixo.
O método **round()** arredonda para o número inteiro mais próximo.

```js
Math.abs(-5.5) // 5.5
Math.ceil(4.8334) // 5
Math.ceil(4.3) // 5
Math.floor(4.8334) // 4
Math.floor(4.3) // 4
Math.round(4.8334) // 5
Math.round(4.3) // 4
```

## Math.max(), Math.min() e Math.random().

O método **max()** retorna o maior número de uma lista de argumentos, o método **min()** retorna o menor número dentre os argumentos da lista. O método **random()** gera um número aleatório entre 0 e 1.

```js
Math.max(5, 3, 10, 42, 2) // 42
Math.min(5, 3, 10, 42, 2) // 2
Math.random() // 0.XXX
Math.floor(Math.random() * 100) // entre 0 e 100
Math.floor(Math.random() * 500)
// entre 0 e 500
// Número random entre 72 e 32
Math.floor(Math.random() * (72 - 32 + 1)) + 32
Math.floor(Math.random() * (max - min + 1)) + min
```

## Exercícios.

```js
// Retorne um número aleatório entre 1050 e 2000
const numeroAleatorio = Math.floor(Math.random() * (2000 - 1050 + 1) + 1050)
// Retorne o maior número da lista abaixo
const numeros = '4, 5, 20, 8, 9'
const arrayDeNumeros = numeros.split(', ')
console.log(Math.max(...arrayDeNumeros))

// Crie uma função para limpar os preços
// e retornar os números com centavos arredondados
// depois retorne a soma total.
const listaPrecos = ['R$ 59,99', ' R$ 100,222', 'R$ 230   ', 'r$  200']
let valorTotal = 0
function limparPrecos(preco) {
  preco.forEach(preco => {
    preco = Number(
      preco
        .toUpperCase()
        .replace('R$', '')
        .trim()
        .replace(',', '.')
    )
    valorTotal += preco
  })
  return valorTotal.toFixed(2)
}
console.log(limparPrecos(listaPrecos))
```

## Array.

Arrays armazenam uma coleção de elementos. Estes podem ser: Strings, Arrays, Booleans, Numbers, Functions, Objects e etc..

```js
const instrumentos = ['Guitarra', 'Baixo', 'Violão']
const precos = [49, 99, 69, 80]

const dados = [
  new String('Tipo 1'),
  ['Carro', 'Moto', 'Barco'],
  function mostraNome(nome) {
    console.log(nome)
  },
  { nome: 'Ruan', curso: 'Javascript ES6+' }
]

dados[3] // { nome: 'Ruan', curso: 'Javascript ES6+' }
dados[2]('Ruan') // 'Ruan'
dados[3].curso.toUpperCase() //  'JAVASCRIPT ES6+'
```

## Construção de Array.

Toda array herda os métodos e propriedades do protótipo do construtor Array.

```js
const instrumentos = ['Guitarra', 'Baixo', 'Violão']
const carros = ['Corola', 'Mustang', 'Honda']

carros[1] // Mustang
carros[2] = 'Ferrari'
carros[10] = 'Parati'
carros.length // 11
```

> Os valores das array's não são estáticos.

## Array.from().

**Array.from()** é um método utilizado para transformar array-like objects, em array.

```js
let $li = document.querySelectorAll('li') // NodeList
$li = Array.from($li) // Array.

const carros = {
  0: 'Fiat',
  1: 'Uno',
  2: 'Mustang',
  length: 4
}

const carrosArray = Array.from(carros)
```

## Array.isArray().

Verifica se o valor passado é uma array e retorna um valor booleano.

```js
let $li = document.querySelectorAll('li') // NodeList
Array.isArray($li) // false

$li = Array.from($li) // Array
Array.isArray($li) // true
```

## Array.of(), Array() e new Array().

Verifica se o valor passado é uma array e retorna um valor booleano. A palavra chave new não é necessária para utilizar o construtor Array.

```js
Array.of(10) // [10]
Array.of(1, 2, 3, 4, 5) // [1,2,3,4,5]
new Array(5) // [ <5 empty items> ]
Array(5) //[ <5 empty items> ]
Array(1, 2, 3, 4, 5) // [1,2,3,4,5]
```

## Propriedade e Métodos do Prototype.

**[].length** retorna o tamanho da Array.

```js
const frutas = ['Banana', 'Pêra', ['Uva Roxa', 'Uva Verde']]
frutas.length // 3

frutas[0].length // 6
frutas[1].length // 5
frutas[2].length // 2
```

## Métodos Modificadores [].sort().

Os próximos métodos que vamos falar sobre, são métodos modificadores(mutator methods). Além de retornarem um valor, eles modificam a Array original. **[].sort** organiza a pela unicode.

```js
const instrumentos = ['Guitarra', 'Baixo', 'Violão']
instrumentos.sort()
instrumentos // ['Baixo', 'Guitarra', Violão]
const idades = [32, 21, 33, 43, 1, 12, 8]
idades.sort()
idades // [1, 12, 21, 32, 33, 43, 8]
```

## [].unshift() e [].push().

**[].unshift()** adiciona elementos ao início da Array e retorna o length da mesma. **[].push()** adiciona elementos ao final da Array e retorna o length da mesma.

```js
const carros = ['Ford', 'Fiat', 'VW']
carros.unshift('Honda', 'Kia') // 5
carros // ['Honda', 'Kia', 'Ford', 'Fiat', 'VW'];
carros.push('Ferrari') // 6
carros // ['Honda', 'Kia', 'Ford', 'Fiat', 'VW', 'Ferrari'];
```

## [].shift() e [].pop().

**[].shift()** remove o primeiro elemento da Array e retorna o mesmo. **[].pop()** remove o último elemento da Array e retorna o mesmo.

```js
const carros = ['Ford', 'Fiat', 'VW', 'Honda']
const primeiroCarro = carros.shift() // 'Ford'
carros // ['Fiat', 'VW', 'Honda'];
const ultimoCarro = carros.pop() // 'Honda'
carros // ['Fiat', 'VW'];
```

## [].reverse().

**[].reverse()** inverte os itens da Array e retorna a nova Array.

```js
const carros = ['Ford', 'Fiat', 'VW', 'Honda']
carros.reverse() // ['Honda', 'VW', 'Fiat', 'Ford'];
```

## [].splice().

**[].splice(index, remover, item1, item2, ...)** adiciona valores na array a partir do index. Remove a quantidade de itens que for passada no segundo parâmetro (retorna esses itens).

```js
const carros = ['Ford', 'Fiat', 'VW', 'Honda']
carros.splice(1, 0, 'Kia', 'Mustang') // []
carros // ['Ford', 'Kia', 'Mustang', 'Fiat', 'VW', 'Honda']
carros.splice(3, 2, 'Ferrari') // ['Fiat', 'VW']
carros // ['Ford', 'Kia', 'Mustang', 'Ferrari', 'Honda']
```

## [].copyWithin().

**[].copyWithin(alvo, inicio, final)** a partir do alvo, ele irá copiar a Array começando do inicio até o final e vai preencher a mesma com essa cópia. Caso omita os valores de início e final, ele irá utilizar como inicio o 0 e final o valor total de Arrays.

```js
const exemplo1 = ['Item1', 'Item2', 'Item3', 'Item4'].copyWithin(2, 0, 3)
const exemplo2 = [('Item1', 'Item2', 'Item3', 'Item4')].copyWithin(-1)

console.log(exemplo1) // ['Item1', 'Item2', 'Item1', 'Item2']
console.log(exemplo2) // ['Item1', 'Item2', 'Item3', 'Item1']
```

## [].fill().

**[].fill(valor, inicio, final)** preenche a Array com o valor, do início até o fim.

```js
;['Item1', 'Item2', 'Item3', 'Item4'].fill('Banana')
// ['Banana', 'Banana', 'Banana', 'Banana']
;['Item1', 'Item2', 'Item3', 'Item4'].fill('Banana', 2)
// ['Item1', 'Item2', 'Banana', 'Banana']
;['Item1', 'Item2', 'Item3', 'Item4'].fill('Banana', 1, 3)
// ['Item1', 'Banana', 'Banana', 'Item4']
```

## Métodos de Acesso [].concat().

Os métodos abaixo não modificam a Array original, apenas retornam uma array modificada. **[].concat()** irá concatenar a Array com o valor passado.

```js
const transporte1 = ['Barco', 'Aviao']
const transporte2 = ['Carro', 'Moto']
const transportes = transporte1.concat(transporte2)
// ['Barco', 'Aviao', 'Carro', 'Moto'];
const maisTransportes = [].concat(transporte1, transporte2, 'Van')
// ['Barco', 'Aviao', 'Carro', 'Moto', 'Van'];
```

## [].includes(), [].indexOf() e [].lastIndexOf().

**[].includes(valor)** verifica se a Array, possui o valor e retorna true ou false. **[].indexOf(valor)** verifica se a Array possui o valor e retorna o index do primeiro valor na Array. Já o **[].lastIndexOf(valor)** retorna o último index.

```js
const linguagens = ['html', 'css', 'js', 'php', 'python', 'js']
linguagens.includes('css') // true
linguagens.includes('ruby') // false
linguagens.indexOf('python') // 4
linguagens.indexOf('js') // 2
linguagens.lastIndexOf('js') // 5
```

## [].join().

**[].join(separador)** junta todos os valores da Array e retorna uma String com eles. Se você passar um valor com parâmetro, este será utilizado durante a junção de cada item da Array.

```js
const linguagens = ['html', 'css', 'js', 'php', 'python']
linguagens.join() // 'html,css,js,php,python'
linguagens.join(' ') // 'html css js php python'
linguagens.join('-_-') // 'html-_-css-_-js-_-php-_-python'
let htmlString = '<h2>Título Principal</h2>'
htmlString = htmlString.split('h2')
// ['<', '>Título Principal</', '>']
htmlString = htmlString.join('h1')
// <h1>Título Principal</h1>
```

## [].slice().

**[].slice(inicio, final)** retorna os itens da Array começando pelo início e indo até o valor de final.

```js
const linguagens = ['html', 'css', 'js', 'php', 'python']
linguagens.slice(3) // ['php', 'python']
linguagens.slice(1, 4) // ['css', 'js', 'php']
const cloneLinguagens = linguagens.slice()
```

## Exercícios.

```js
const comidas = ['Pizza', 'Frango', 'Carne', 'Macarrão']
// Remova o primeiro valor de comidas e coloque em uma variável
// Remova o último valor de comidas e coloque em uma variável
// Adicione 'Arroz' ao final da array
// Adicione 'Peixe' e 'Batata' ao início da array
const primeiraComida = comidas.shift()
const ultimaComida = comidas.pop()
comidas.push('Arroz')
comidas.unshift('Peixe', 'Batata')

const estudantes = ['Marcio', 'Brenda', 'Joana', 'Kleber', 'Julia']
// Arrume os estudantes em ordem alfabética
// Inverta a ordem dos estudantes
// Verifique se Joana faz parte dos estudantes
// Verifique se Juliana faz parte dos estudantes
estudantes.sort()
estudantes.reverse()
console.log(estudantes.includes('Joana'))
console.log(estudantes.includes('Juliana'))

let html = `<section>
              <div>Sobre</div>  
              <div>Produtos</div>
              <div>Contato</div>
            </section>`
// Substitua section por ul e div com li,
// utilizando split e join
console.log(
  html
    .split('section')
    .join('ul')
    .split('div')
    .join('li')
)

const carros = ['Ford', 'Fiat', 'VW', 'Honda']
// Remova o último carro, mas antes de remover
// salve a array original em outra variável
const carrosCopia = carros.slice(0)
carros.pop()
console.log(carros)
console.log(carrosCopia)
```

## Array e Iteração.

## [].forEach().

**[].forEach(callback(itemAtual, index, array))** a função de callback é executada para cada item da Array. Ela possui três argumentos, itemAtual (valor do item da array), index (index da array) e array (array original).

```js
const carros = ['Ford', 'Fiat', 'Honda']
carros.forEach(function(item, index, array) {
  console.log(item.toUpperCase())
})
// com Arrow Function
carros.forEach((item, index, array) => {
  console.log(item.toUpperCase())
})
```

> O método sempre retorna undefined.

## Arrow Function.

Uma expressão [arrow function](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions) possui uma sintaxe mais curta quando comparada a uma expressão de função (function expression) e não tem seu próprio this, arguments, super ou new.target. Estas expressões de funções são melhor aplicadas para funções que não sejam métodos, e elas não podem ser usadas como construtoras (constructors).

```js
const li = document.querySelectorAll('li')
li.forEach(i => i.classList.add('ativa'))

li.forEach(function(item) {
  item.classList.add('ativa')
})
```

## Modificar a Array Original.

O terceiro argumento do callback é uma referência direta e se modificado irá também modificar a array original.

```js
const carros = ['Ford', 'Fiat', 'Honda']
carros.forEach((item, index, array) => {
  array[index] = 'Carro ' + item
})
carros // ['Carro Ford', 'Carro Fiat', 'Carro Honda']
```

> É melhor utilizarmos o map para isso.

## [].map().

**[].map(callback(itemAtual, index, array))** funciona da mesma forma que o forEach(), porém ao invés de retornar undefined, retorna uma nova array com valores atualizados de acordo com o return de cada iteração.

```js
const carros = ['Ford', 'Fiat', 'Honda']
const newCarros = carros.map(item => {
  return 'Carro ' + item
})
carros // ['Ford', 'Fiat', 'Honda']
newCarros // ['Carro Ford', 'Carro Fiat', 'Carro Honda'];
```

## Valor retornado.

Se não retornarmos nenhum valor durante a iteração utilizando map, o valor retornado como de qualquer função que não possui o return, será undefined.

```js
const carros = ['Ford', 'Fiat', 'Honda']
const newCarros = carros.map(item => {
  const novoValor = 'Carro ' + item
})
newCarros // [undefined, undefined, undefined];
```

## Arrow Function e [].map().

Uma Arrow Function de linha única e sem chaves irá retornar o valor após a fat arrow **=>**.

```js
const numeros = [2, 4, 6, 8, 10, 12, 14]
const numerosX3 = numeros.map(n => n * 3)
numerosX3 // [6, 12, 18, 24, 30, 36, 42];
```

## [].map() vs [].forEach().

Se o objetivo for modificar os valores da array atual, sempre utilize o map, pois assim uma nova array com os valores modificados é retornada e você pode imediatamente iterrar novamente sobre estes valores.

```js
const numeros = [2, 4, 6, 8, 10, 12, 14]
const numerosX3 = numeros.map(n => n * 3)
numerosX3 // [6, 12, 18, 24, 30, 36, 42];
```

## [].map() com Objetos.

Map pode ser útil para interagirmos com uma array de objetos, onde desejamos isolar um valor único de cada objeto.

```js
const aulas = [
  {
    nome: 'HTML 1',
    min: 15
  },
  {
    nome: 'HTML 2',
    min: 10
  },
  {
    nome: 'CSS 1',
    min: 20
  },
  {
    nome: 'JS 1',
    min: 25
  }
]

const puxarNomes = aulas.map(aula => aula.nome)
console.log(puxarNomes)
// ['HTML 1', 'HTML 2', 'CSS 1', 'JS 1']
```

## [].reduce().

**[].reduce(callback(acumulador, valorAtual, index,array), valorInicial)** executa a função de callback para cada item da Array. Um valor especial existe nessa função de callback, ele é chamado de **acumulador**, mas é na verdade apenas o retorno da iteração anterior.

```js
const aulas = [10, 25, 30]
const total1 = aulas.reduce((acumulador, atual) => {
  return acumulador + atual
})
total1 // 65
const total2 = aulas.reduce((acc, cur) => acc + cur, 100)
total2 // 165
```

## Reduce Passo a Passo 1.

O primeiro parâmetro do callback é o valor do segundo argumento passado do reduce (callback inicial) durante a primeira iteração. Nas iterações seguintes este valor passa a ser retornado pela anterior.

```js
const aulas = [10, 25, 30]
// 1
aulas.reduce((0, 10) => {
  return 0 + 10
}, 0) // retorna 10

// 2
aulas.reduce((10, 25) => {
  return 10 + 25
}, 0) // retorna 35

// 3
aulas.reduce((35, 30) => {
  return 35 + 3
}, 0) // retorna 65
```

## Reduce Passos a Passos 2.

Se não definirmos o valor inicial do acumulador, ele irá **pular** a primeira iteração e começara a partir da segunda. Nesse caso o valor acumulador será o valor do item da primeira iteração.

```js
const aulas = [10, 25, 30]
// 1
aulas.reduce((10, 25) => {
  return 10 + 25
}) // retorna 35
// 2
aulas.reduce((35, 30) => {
  return 35 + 30
}) // retorna 65
```

## Outros exemplos com o reduce.

Podemos verificar qual é o maior valor dentro do Array.

```js
const numeros = [10, 25, 60, 5, 35, 10]
const maiorValor = numeros.reduce((anterior, atual) => {
  return anterior < atual ? atual : anterior
})
maiorValor // 60
```

## [].reduceRight().

Existe também o método **[].reduceRight()**, a diferença é que este começa a iterar da direita para a esquerda, enquanto o reduce itera da esquerda para a direita.

```js
const frutas = ['Banana', 'Pêra', 'Uva']
const frutasRight = frutas.reduceRight((acc, fruta) => acc + '' + fruta)
const frutasLeft = frutas.reduce((acc, fruta) => acc + ' ' + fruta)
frutasRight // Uva Pêra Banana
frutasLeft // Banana Pêra Uva
```

## [].some().

**[].some()**, se pelo menos um return da iteração for truthy, ele retorna true.

```js
const frutas = ['Banana', 'Pêra', 'Uva']
const temUva = frutas.some(fruta => {
  return fruta === 'Uva'
}) // true
function maiorQue100(numero) {
  return numero > 100
}
const numeros = [0, 43, 22, 88, 101, 2]
const temMaior = numeros.some(maiorQue100) // true
```

## [].every().

**[].every()**, se todos os returns das iterações forem truthy, o método irá retornar true. Se pelo menos um for falsy, ele irá retornar false.

```js
const frutas = ['Banana', 'Pêra', 'Uva', '']
// False pois pelo menos uma fruta
// está vazia '', o que é um valor falsy
const arraysCheias = frutas.every(fruta => {
  return fruta // false
})
const numeros = [6, 43, 22, 88, 101, 29]
const maiorQue3 = numeros.every(x => x > 3) // true
```

## [].find() e [].findIndex().

**[].find()**, retorna o valor atual da primeira iteração que retorna um valor truthy. Já o **[].findIndex()**, ao invés de retornar o valor, retorna o index deste valor na array.

```js
const frutas = ['Banana', 'Pêra', 'Uva', 'Maçã']
const buscaUva = frutas.findIndex(fruta => {
  return fruta === 'Uva'
}) // 2
const numeros = [6, 43, 22, 88, 101, 29]
const buscaMaior45 = numeros.find(x => x > 45) // 88
```

## [].filter().

**[].filter()**, retorna uma array com a lista de valoresque durante a sua iteração retornam um valor truthy.

```js
const frutas = ['Banana', undefined, null, '', 'Uva', 0, 'Maçã']
const arrayLimpa = frutas.filter(fruta => {
  return fruta
}) // ['Banana', 'Uva', 'Maçã']
const numeros = [6, 43, 22, 88, 101, 29]
const buscaMaior45 = numeros.filter(x => x > 45) // [88, 101]
```

## Outros exemplos com o filter.

Podemos usar o filter para filtrar apenas as aulas com tempo maior do que 15 minutos.

```js
const aulas = [
  {
    nome: 'HTML 1',
    min: 15
  },
  {
    nome: 'HTML 2',
    min: 10
  },
  {
    nome: 'CSS 1',
    min: 20
  },
  {
    nome: 'JS 1',
    min: 25
  }
]

const aulasMaiores = aulas.filter(aula => aula.min > 15)
// [ { nome: 'CSS 1', min: 20 }, { nome: 'JS 1', min: 25 } ]
```

## Exercícios

```html
<section class="curso">
  <h1>Web Design Completo</h1>
  <p>
    Este curso é para quem deseja entrar ou já está no mercado de criação de
    websites.
  </p>
  <span class="aulas">80</span>
  <span class="horas">22</span>
</section>
<section class="curso">
  <h1>WordPress Como CMS</h1>
  <p>
    No curso de WordPress Como CMS, você aprende do zero como pegar qualquer
    site em HTML e torná-lo totalmente gerenciável com a plataforma do
    WordPress.
  </p>
  <span class="aulas">46</span>
  <span class="horas">9</span>
</section>
<section class="curso">
  <h1>UI Design Avançado</h1>
  <p>Este é um curso avançado de User Interface Design.</p>
  <span class="aulas">55</span>
  <span class="horas">15</span>
</section>
```

```js
'use strict'

// Selecione cada curso e retorne uma array
// com objetos contendo o título, descricao,
// aulas e horas de cada curso

const cursos = document.querySelectorAll('.curso')
const cursoParaArray = Array.from(cursos)

const cursosParaObjeto = cursoParaArray.map(curso => {
  const titulo = curso.querySelector('h1').innerText
  const descricao = curso.querySelector('p').innerText
  const aulas = curso.querySelector('.aulas').innerText
  const horas = curso.querySelector('.horas').innerText

  return {
    titulo: titulo,
    descricao: descricao,
    aulas: aulas,
    horas: horas
  }
})

console.log(cursosParaObjeto)

// Retorne uma lista com os
// números maiores que 100
const numeros = [3, 44, 333, 23, 122, 322, 33]
const maioresQue100 = numeros.filter(numero => numero > 100)
console.log(maioresQue100)

// Verifique se Baixo faz parte
// da lista de instrumentos e retorne true
const instrumentos = ['Guitarra', 'Baixo', 'Bateria', 'Teclado']
console.log(instrumentos.some(instrumento => instrumento === 'Baixo'))

// Retorne o valor total das compras
const compras = [
  {
    item: 'Banana',
    preco: 'R$ 4,99'
  },
  {
    item: 'Ovo',
    preco: 'R$ 2,99'
  },
  {
    item: 'Carne',
    preco: 'R$ 25,49'
  },
  {
    item: 'Refrigerante',
    preco: 'R$ 5,35'
  },
  {
    item: 'Quejo',
    preco: 'R$ 10,60'
  }
]

const total = compras.reduce((acumulador, atual) => {
  let formatarPreco = Number(atual.preco.replace('R$ ', '').replace(',', '.'))
  return formatarPreco + acumulador
}, 0)

console.log(total)
```

# Functions.

Toda função é criada com o construtor Function e por isso herda as suas propriedades e métodos.

```js
function areaQuadrado(lado) {
  return lado * lado
}

const perimetroQuadrado = new Function('lado', 'return lado * 4')
```

## Propriedades.

**Function.length** retorna o total de argumentos da função. **Function.name** retorna uma string contendo o nome da função.

```js
function somar(n1, n2) {
  return n1 + n2
}

somar.length // 2
somar.name // 'somar'
```

## Function.call().

**function.call(this, arg1, arg2, ...)**. executa a função sendo possível passarmos uma nova referência ao _this_ para a mesma.

```js
const carro = {
  marca: 'Fiat',
  ano: 2010
}

function descricaoCarro() {
  console.log(this.marca + ' ' this.ano)
}

descricaoCarro() // undefined undefined
descricaoCarro.call() // undefined undefined
descricaoCarro.call(carro) // 'Fiat 2010'
```

## This.

O valor de this faz referência ao objeto criado durante a construção do objeto (Constructor Function). Podemos trocar a referência do método ao this, utilizando o método **call(this)**, passando a nova referência para o _this_.

```js
const carros = ['Ford', 'Fiat', 'VW']

carros.forEach(item => {
  console.log(item)
}) // Log de cada Carro

carros.forEach.call(carros, item => {
  console.log(item)
}) // Log de cada Carro

const frutas = ['Banana', 'Pêra', 'Uva']

carros.forEach.call(frutas, item => {
  console.log(item)
}) // Log de cada Fruta
```

## Exemplos Reais.

O objeto atribuído a **lista** será substituído pelo primeiro argumento do método **call()**.

```js
function DOM(seletor) {
  this.element = document.querySelector(seletor)
}
DOM.prototype.ativo = function(classe) {
  this.element.classList.add(classe)
}
const lista = new DOM('ul')
lista.ativo('ativar')
console.log(lista)
```

## O Objeto deve ser parecido.

O novo valor de _this_ deve ser semelhante a estrutura do valor do _this_ original do método. Caso contrário o método não conseguirá interagir de forma correta com o novo valor de _this_.

```js
const novoSeletor = {
  element: document.querySelector('li')
}

DOM.prototype.ativo.call(novoSeletor, 'ativar')
```

## Array's e Call.

É comum utilizamos o **call()** nas funções do protótipo do construtor Array. Assim podemos estender todos os métodos de Array à objetos que parecem com uma Array (array-like).

```js
Array.prototype.mostreThis = function() {
  console.log(this)
}
const frutas = ['Uva', 'Maçã', 'Banana']
frutas.mostreThis() // ['Uva', 'Maçã', 'Banana']

Array.prototype.pop.call(frutas) // Remove Banana
frutas.pop() // Mesma coisa que a função acima
```

## Array-like.

HTMLCollection, NodeList e demais objetos do DOM, são parecidos com uma Array. Por isso conseguimos utilizar os mesmos nas substituição do _this_ em _call_.

```js
const li = document.querySelectorAll('li')

Array.prototype.filter.call(li, function(item) {
  return item.classList.contains('ativo')
})

filtro // Retorna os itens que possuem ativo
```

## function.apply().

O **applly(this, [arg1, arg2, ...])** funciona como o método call, a única diferença é que os argumentos da função são passados através de uma Array.

```js
const numeros = [1, 2, 3, 4, 5]
Math.max.apply(null, numeros) // 5
Math.max.call(null, 1, 2, 3, 4, 5) // 5

// Podemos passar null para o valor de this, caso a função não utilize o objeto principal para funcional.
```

## Apply vs Call.

A única diferença é a array como segundo argumento.

```js
const li = document.querySelectorAll('li')

function itemPossuiAtivo(item) {
  return item.classList.contains('ativo')
}

const filtro1 = Array.prototype.filter.call(li, itemPossuiAtivo)
const filtro2 = Array.prototype.filter.apply(li, [itemPossuiAtivo])
```

## function.bind().

Diferente de call e apply, **bind(this, arg, arg2, ...)** não irá executar a função mas sim retorna a mesma com o novo contexto de this.

```js
const li = document.querySelectorAll('li')

const filtrarLi = Array.prototype.filter.bind(li, function(item) {
  return item.classList.contains('ativo')
})

filtrarLi()
```

## Arguementos e Bind.

Não precisa passar todos os argumentos no momento do bind, podemos passar os mesmos para a nova função no momento da execução da mesma.

```js
const carro = {
  marca: 'Ford',
  ano: 2018,
  acelerar: function(aceleracao, tempo) {
    return `${this.marca} acelerou ${aceleracao} em ${tempo}`
  }
}

carro.acelerar(200, 20)
// Ford acelerou 200 em 20

const honda = {
  marca: 'Honda'
}

const acelerarHonda = carro.acelerar.bind(honda)

acelerarHonda(300, 10)
// Honda acelerou 300 em 10
```

## Argumentos Comuns.

Podemos passar argumentos padrões para uma função e retornar uma nova função.

```js
function imc(altura, peso) {
  return peso / (altura * altura)
}

const imc180 = imc.bind(null, 1.8)

imc(1.8, 70) // 21.6
imc180(70) // 21.6
```

## Exercícios.

```html
<section>
  <p>
    Lobo-cinzento (nome científico:Canis lupus) é uma espécie de mamífero
    canídeo do gênero Canis. É um sobrevivente da Era do Gelo, originário do
    Pleistoceno Superior, cerca de 300 mil anos atrás. É o maior membro
    remanescente selvagem da família canidae.
  </p>
  <p>
    Os lobos-cinzentos são tipicamente predadores ápice nos ecossistemas que
    ocupam. Embora não sejam tão adaptáveis à presença humana como geralmente
    ocorre com as demais.
  </p>
  <p>
    O peso e tamanho dos lobos variam muito em todo o mundo, tendendo a aumentar
    proporcionalmente com a latitude.
  </p>
  <p>
    Os lobos são capazes de percorrer longas distâncias com uma velocidade média
    de 10 quilômetros por hora e são conhecidos por.
  </p>
</section>
```

```js
'use strict'

// Retorne a soma total de caracteres dos
// parágrafos acima utilizando reduce

const paragrafos = document.querySelectorAll('p')
const totalDeCaracteres = Array.prototype.reduce.call(
  paragrafos,
  (acumulador, atual) => {
    return acumulador + atual.innerText.length
  },
  0
)
console.log(totalDeCaracteres)
// Crie uma função que retorne elementos html, com os seguintes parâmetros: tag, classe e conteúdo.
function criarElementosHTML(tag, classe, conteudo) {
  const elemento = document.createElement(tag)

  function verificarConteudoEClasse(elemento, classe, conteudo) {
    if (classe) {
      elemento.classList.add(classe)
    }

    if (conteudo) {
      elemento.innerHTML = conteudo
    }

    return null
  }
  verificarConteudoEClasse(elemento, classe, conteudo)

  return elemento
}
// Crie uma nova função utilizando a anterior como base essa nova função deverá sempre criar h1 com a
// classe titulo. Porém o parâmetro conteudo continuará dinâmico
const h1Titulo = criarElementosHTML.bind(null, 'h1', 'titulo')
const h1HTML = criarElementosHTML.bind(null, 'h1', 'titulo')
console.log(h1Titulo('curso de Javascript'))
console.log(h1HTML('Curso de HTML'))
```
