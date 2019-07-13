# DOM para iniciantes.

## Seleção de elementos.

## ID

**getElementById** seleciona e retorna elementos do DOM.

```js
// Seleciona pelo ID
const animaisSection = document.getElementById('animais')
const contatoSection = document.getElementById('contato')
// Retorna null caso não exista
const naoExiste = document.getElementById('teste')
```

## Classe e Tag

**getElementsByClassName** e **getElementsByTagName** selecionam e retornam uma lista de elementos do DOM. A lista retornada está ao vivo, signica que se elementos forem adicionados, ela será automaticamente atualizada.

```js
// Seleciona pela classe, retorna uma HTMLCollection
const gridSection = document.getElementsByClassName('grid-section')
const contato = document.getElementsByClassName('grid-section contato')

// Seleciona todas as UL's, retorna uma HTMLCollection
const ul = document.getElementsByTagName('ul')

// Retorna o primeiro elemento
console.log(gridSection[0])
```

## Seletor Geral Único

**querySelector** retorna o primeiro elemento que combinar com o seu seletor CSS.

```js
const animais = document.querySelector('.animais')
const contato = document.querySelector('#contato')
const ultimoItem = document.querySelector('.animais-lista li:last-child')
const linkCSS = document.querySelector('[href^="https://"]')
const primeiroUl = document.querySelector('ul')
// Busca dentro do Ul apenas
const navItem = primeiroUl.querySelector('li')
```

## Seletor Geral Lista

**querySelectorAll** retorna todos os elementos compatíveis com o seletor CSS em uma NodeList.

```js
const gridSection = document.querySelectorAll('.grid-section')
const listas = document.querySelectorAll('ul')
const titulos = document.querySelectorAll('.titulo')
const fotosAnimais = document.querySelectorAll('.animais-lista img')

// Retorna o segundo elemento
console.log(gridSection[1])
```

> Diferente do getElementsByClassName, a lista aqui é estática.

## HTMLCollection vs NodeList.

A diferença está nos métodos e propriedades de ambas. Além disso a NodeList retornada com querySelectorAll é estática.

Segundo o site da MDN é descrito como:

**HTMLCollection:** _A interface HTMLCollection representa uma coleção genérica (objeto array) de elementos (na ordem em que aparecem no documento) e oferece métodos e propriedades para selecioná-los da lista._

**NodeList:** _Objetos NodeList são coleções de nodos semelhantes aos objetos retornados pelos métodos Node.childNodes e document.querySelectorAll()._

```js
const titulo = document.querySelector('.titulo')
const gridSectionHTML = document.getElementsByClassName('grid-section')
const gridSectionNode = document.querySelectorAll('.grid-section')
titulo.classList.add('grid-section')
console.log(gridSectionHTML) // 4 itens
console.log(gridSectionNode) // 3 itens
```

##Array-Like
**HTMLCollection** e **NodeList** são array-like, parecem uma array mas
não são. O método de Array forEach() por exemplo, existe apenas em NodeList.

```js
const gridSection = document.querySelectorAll('.grid-section')
gridSection.forEach(function(gridItem, index, array) {
  gridItem.classList.add('azul')
  console.log(index) // index do item na array
  console.log(array) // a array completa
})
```

É possível transformar array-like em uma Array real, utilizando o método Array.from(gridSection)

## Exercícos.

```js
'use strict'

// Exercícios - 0303-selecao-de-elementos.

// Retorne no console todas as imagens do site
const $allImg = document.querySelectorAll('img')
console.log($allImg)

// Retorne no console apenas as imagens que começam com a palavra imagem
const $initalImage = document.querySelectorAll('img[src^="img/imagem"]')
console.log($initalImage)

// Selecione Todos os links internos( onde o href começa com #)
const $allLinks = document.querySelectorAll('[href^="#"]')
console.log($allLinks)

// Selecione o primeiro h2 dentro de .animais-descricao
const $firstH2 = document.querySelector('.animais-descricao h2')
console.log($firstH2)

// Selecione o ultimo p do site
const $lastP = document.querySelector('.copy p')
console.log($lastP)
```

### Links:

- [NodeList](https://developer.mozilla.org/pt-BR/docs/Web/API/NodeList)
- [HTMLCollection](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCollection)

# forEach e Arrow Functions.

#forEach

Constantemente vamos selecionar uma lista de itens do dom. A melhor forma para interagirmos com os mesmos é utilizando o método forEach.

```js
const imgs = document.querySelectorAll('img')
imgs.forEach(function(item) {
  console.log(item)
})
```

# Parâmetros do forEach

O primeiro parâmetro é o callback, ou seja, a função que será
ativada a cada item. Esse função pode receber três parâmetros: valorAtual, index e array;

```js
const imgs = document.querySelectorAll('img')
imgs.forEach(function(valorAtual, index, array) {
  console.log(item) // o item atual no loop
  console.log(index) // o número do index
  console.log(array) // a Array completa
})
```

# forEach e Array

forEach é um método de Array, alguns objetos array-like possuem este método. Caso não possua, o ideal é transformá-los em uma array.

```js
const titulos = document.getElementsByClassName('titulo')
const titulosArray = Array.from(titulos)
titulosArray.forEach(function(item) {
  console.log(item)
})
```

# Arrow Function

Sintaxe curta em relação a function expression. Basta remover a palavra chave function e adicionar a fat arrow => após os argumentos.

```js
const imgs = document.querySelectorAll('img')
imgs.forEach(item => {
  console.log(item)
})
```

Arrow functions vão além disso, [para saber mais](https://blog.da2k.com.br/2019/01/07/javascript-tudo-sobre-arrow-functions/).

#Argumentos e Parênteses

```js
const imgs = document.querySelectorAll('img')
// argumento único não precisa de parênteses
imgs.forEach(item => {
  console.log(item)
})
// multiplos argumentos precisam de parênteses
imgs.forEach((item, index) => {
  console.log(item, index)
})
// sem argumentos precisa dos parênteses, mesmo vazio
let i = 0
imgs.forEach(() => {
  console.log(i++)
})
```

# Return

É possível omitir as chaves {} para uma função que retorna uma linha.

```js
const imgs = document.querySelectorAll('img')
imgs.forEach(item => console.log(item))
imgs.forEach(item => console.log(item))
```

> Não é permitido fechar a linha com ;

## Exercícios.

```js
//Exercícos
// Mostre no console cada parágrado do site
const paragrafos = document.querySelectorAll('p')
paragrafos.forEach(item => console.log(item))

// Mostre o texto dos parágrafos no console
paragrafos.forEach(item => console.log(item.innerText))

// Como corrigir os erros abaixo:
const imgs = document.querySelectorAll('img')
imgs.forEach((item, index) => {
  console.log(item, index)
})

let i = 0
imgs.forEach(item => {
  console.log(i++)
})

imgs.forEach(() => i++)
```

# Classes e Atributos.

## classList

Retorna uma lista com as classes do elemento. Permite adicionar, remover e verifica se contém o mesmo.

```js
const menu = document.querySelector('.menu')
menu.className // string
menu.classList // lista de classes
menu.classList.add('ativo')
menu.classList.add('ativo', 'mobile') // duas classes
menu.classList.remove('ativo')
menu.classList.toggle('ativo') // adiciona/remove a classe
menu.classList.contains('ativo') // true ou false
menu.classList.replace('ativo', 'inativo')
```

## attributes.

Retorna uma array-like com os atributos do elemento.

```js
const animais = document.querySelector('.animais')
animais.attributes // retorna todos os atributos
animais.attributes[0] // retorna o primeiro atributo
```

## getAttribute e setAttribute.

Métodos que retornam ou de nem de acordo com o atributo selecionado.

```js
const img = document.querySelector('img')
img.getAttribute('src') // valor do src
img.setAttribute('alt', 'Texto Alternativo') // muda o alt
img.hasAttribute('id') // true / false
img.removeAttribute('alt') // remove o alt
img.hasAttributes() // true / false se tem algum atributo
```

> É muito comum métodos de get e set;

## Read Only vs Writable.

Existem propriedades que não permitem a mudança de seus valores, essas são considerados Read Only, ou seja, apenas leitura.

```js
const animais = document.querySelector('.animais')
animais.className // string com o nome das classes
animais.className = 'azul' // substitui completamente a string
animais.className += ' vermelho' // adiciona vermelho à string
animais.attributes = 'class="ativo"' // não funciona, read-only
```

> Lembre-se que podemos modificar o valor de uma propriedade objeto.propriedade = ''

## Exercícios.

```js
// Adicione a classe ativo a todos os items do menu
const $menu = document.querySelectorAll('.menu a')
$menu.forEach(item => item.classList.add('ativo'))
console.log($menu)

// Remova a classe ativo de todos os items do menu e mantenha apenas no primeiro
$menu.forEach(item => item.classList.remove('ativo'))
$menu[0].classList.add('ativo')
console.log($menu)

// Verifique se as imagens possuem o atributo alt
const $imgAlt = document.querySelectorAll('img')
$imgAlt.forEach(item => console.log(item.hasAttribute('alt')))

// Modifique o href do link externo no menu
const $href = document.querySelector('a[href^="http"]')
$href.setAttribute('href', 'http://github.com')
console.log($href)
```
