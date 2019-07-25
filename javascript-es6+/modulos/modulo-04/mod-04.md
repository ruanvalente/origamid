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

// Retorne o maior número da lista abaixo
const numeros = '4, 5, 20, 8, 9'
// Crie uma função para limpar os preços
// e retornar os números com centavos arredondados
// depois retorne a soma total.
const listaPrecos = = ['R$ 59,99', ' R$ 100,222',
                      'R$ 230   ', 'r$  200'];
```
