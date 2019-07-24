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
```
