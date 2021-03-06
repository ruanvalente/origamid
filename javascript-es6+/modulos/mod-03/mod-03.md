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

# Dimensões e Distâncias.

## Height e Width.

Estas são propriedades e métodos dos objetos **Element** e **HTMLElement** , a maioria delas são Read Only.

```js
const section = document.querySelector('.animais')
section.clientHeight // height + padding
section.offsetHeight // height + padding + border
section.scrollHeight // height total, mesmo dentro de scroll
```

> A mesma coisa para o Width, **clientWidth**.

## offsetTop e o offsetLeft.

```js
const section = document.querySelector('.animais')

// Distância entre o topo do elemento e o topo da página
section.offsetTop

// Distância entre o canto esquerdo do elemento  e o canto esquerdo da página
section.offsetLeft
```

## getBoundingClientRect().

Método que retorna um objeto com valores de width, height, distâncias do elemento e mais.

```js
const section = document.querySelector('.animais')
const rect = section.getBoundingClientRect()
rect.height // height do elemento
rect.width // width do elemento
rect.top // distância entre o topo do elemento e o scroll
```

## Window.

O objeto window representa uma janela que contém um elemento DOM; a propriedade document aponta para o documento DOM document carregado naquela janela.

```js
window.innerWidth // width do janela
window.outerWidth // soma dev tools também
window.innerHeight // height do janela
window.outerWidth // soma a barra de endereço
window.pageYOffset // distância total do scroll horizontal
window.pageXOffset // distância total do scroll vertical
if (window.innerWidth < 600) {
  console.log('Tela menor que 600px')
}
```

[Para saber mais sobre o objeto window](https://developer.mozilla.org/pt-BR/docs/Web/API/Window)

## matchMedia().

Utilize um media-querie como no CSS para veri car a largura do browser.

```js
const small = window.matchMedia('(max-width: 600px)')
if (small.matches) {
  console.log('Tela menor que 600px')
} else {
  console.log('Tela maior que 600px')
}
```

## Dicas:

A ferramenta de desenvolvedor do Chrome armazena o seu histórico recente de seleção em uma variável especial acessível no console. No Inspetor de elementos, ou na página com 'Inspecionar elemento', é armazenada em $0. O segundo mais recente armazenado em $1 e assim por diante, até a \$4.

## Exercícios

```js
// Verifique a distância da primeira imagem
// em relação ao topo da página
const $imgTop = document.querySelector('img')
console.log($imgTop.offsetTop)

// Retorne a soma da largura de todas as imagens
window.onload = function() {
  const $imgAll = document.querySelectorAll('img')
  let sum = 0
  $imgAll.forEach(img => {
    sum += img.offsetWidth
  })
  console.log(sum)
}

// Verifique se os links da página possuem
// o mínimo recomendado para telas utilizadas
// com o dedo. (48px/48px de acordo com o google)
const $links = document.querySelectorAll('a')

$links.forEach(link => {
  const clientWidthRecomends = link.offsetWidth
  const clientHeightRecomends = link.offsetHeight
  if (clientWidthRecomends >= 48 && clientHeightRecomends >= 48) {
    console.log(link, 'Sim, possui')
  } else {
    console.log('Não, possui')
  }
})

// Se o browser for menor que 720px,
// adicione a classe menu-mobile ao menu

const small = window.matchMedia('(max-width: 720px)').matches

if (small) {
  const $menu = document.querySelector('.menu')
  $menu.classList.add('menu-mobile')
}
```

# Eventos.

## addEventListener.

Adiciona uma função ao elemento, esta chamada de **callback**, que será ativada assim que certo **evento** ocorrer neste elemento.

```js
const img = document.querySelector('img')

// elemento.addEventListener(event, callback, options)
img.addEventListener('click', function() {
  console.log('Clicou')
})
```

> O terceiro parâmetro é opcional.

## Callback.

É boa prática separar a função de callback do addEventListener, ou seja, declarar uma função ao invés de passar diretamente uma função anônima

```js
const img = document.querySelector('img')
function callback() {
  console.log('Clicou')
}
img.addEventListener('click', callback) //
img.addEventListener('click', callback()) // undefined
img.addEventListener('click', function() {
  console.log('Clicou')
})
img.addEventListener('click', () => {
  console.log('Clicou')
})
```

## Event.

O primeiro parâmetro do callback é referente ao evento que ocorreu.

```js
const img = document.querySelector('img')
function callback(event) {
  console.log(event)
}
img.addEventListener('click', callback)
```

> Geralmente utilizam **e** como nome do parâmetro.

## Propriedades do Event.

```js
const animaisLista = document.querySelector('.animais-lista')
function executarCallback(event) {
  const currentTarget = event.currentTarget // this
  const target = event.target // onde o clique ocorreu
  const type = event.type // tipo de evento
  const path = event.path
  console.log(currentTarget, target, type, path)
}
animaisLista.addEventListener('click', executarCallback)
```

## event.preventDefault().

Previne o comportamento padrão do evento no browser. No caso de um link externo, por exemplo, irá previnir que o link seja ativado.

```js
const linkExterno = document.querySelector('a[href^="http"]')
function clickNoLink(event) {
  event.preventDefault()
  console.log(event.currentTarget.href)
}
linkExterno.addEventListener('click', clickNoLink)
```

## this.

A palavra chave **this** é uma palavra especial de JavaScript, que pode fazer referência a diferentes objetos dependendo do contexto. No caso de eventos, ela fará referência ao elemento em que **addEventListener foi adicionado**.

```js
const img = document.querySelector('img')
function callback(event) {
  console.log(this) // retorna a imagem
  console.log(this.getAttribute('src'))
}
img.addEventListener('click', callback)
```

> Geralmente igual ao **event.currentTarget**.

## Diferentes Eventos.

Existem diversos eventos como **click**, **scroll**, **resize**, **keydown**, **keyup**, **mouseenter** e mais. Eventos podem ser adicionados a diferentes elementos, como o **window** e **document** também.

```js
const h1 = document.querySelector('h1')
function callback(event) {
  console.log(event.type, event)
}
h1.addEventListener('click', callback)
h1.addEventListener('mouseenter', callback)
window.addEventListener('scroll', callback)
window.addEventListener('resize', callback)
window.addEventListener('keydown', callback)
```

[Para saber mais sobre eventos.](https://developer.mozilla.org/en-US/docs/Web/Events)

## Keyboard.

Você pode adicionar atalhos para facilitar a navegação no seu site, através de eventos do **keyboard**.

```js
function handleKeyboard(event) {
  if (event.key === 'a') {
    document.body.classList.toggle('azul')
  } else if (event.key === 'v') {
    document.body.classList.toggle('vermelho')
  }
}
window.addEventListener('keydown', callback)
```

## forEach e Eventos.

O método **addEventListener** é adicionado à um único elemento, então é necessário um loop entre elementos de uma lista, para adicionarmos à cada um deles.

```js
const imgs = document.querySelectorAll('img')
function imgSrc(event) {
  const src = event.currentTarget.getAttribute('src')
  console.log(src)
}
imgs.forEach(img => {
  img.addEventListener('click', imgSrc)
})
```

## Exercícios.

```js
// Exercícos

/**
 * Quando o usuário clicar nos links do site adicione a classe ativo ao item clicado e remova dos demais itens caso eles possuam a mesma. Previna o comportamento padrão desses links.
 */
const $links = document.querySelectorAll('a[href^="#"]')

function handleClickLink(event) {
  event.preventDefault()
  $links.forEach(link => link.classList.remove('ativo'))
  event.currentTarget.classList.add('ativo')
}

$links.forEach(link => link.addEventListener('click', handleClickLink, false))

/**
 * Selecione todos os elementos do site começando  apartir do body ao clicar, mostre exatamente quais elementos quais elementos estão sendo clicados
 */
const $allElements = document.querySelectorAll('body *')

function handleClickBody(event) {
  console.log(event.currentTarget)
}

$allElements.forEach(item =>
  item.addEventListener('click', handleClickBody, false)
)

/**
 * Utilizando o código anterior, ao invés de mostrar no console, remova o elemento que está sendo clicado. O método remove() remove um elemento.
 */
function handleClickBodyRemove(event) {
  event.preventDefault()
  event.currentTarget.remove()
}
$allElements.forEach(item =>
  item.addEventListener('click', handleClickBodyRemove, false)
)
/**
 * Se um usuário clicar na tecla (t), aumente todo o texto do site.
 */
function handleFontSizeBig(event) {
  if (event.key === 't') {
    document.documentElement.classList.toggle('texto-maior')
  }
}

window.addEventListener('keydown', handleFontSizeBig, false)
```

# Transversing e Manipulação.

## outerHTML, innerHTML e innerText.

Propriedades que retornam uma string contendo o html ou texto. É possível atribuir um novo valor para as mesmas **element.innerText = 'Novo Texto'**.

```js
const menu = document.querySelector('.menu')
menu.outerHTML // todo o html do elemento
menu.innerHTML // html interno
menu.innerText // texto, sem tags
menu.innerText = '<p>Texto</p>' // a tag vai como texto
menu.innerHTML = '<p>Texto</p>' // a tag é renderizada
```

## Transversing.

Como navegar pelo DOM, utilizando suas propriedades e métodos.

```js
const lista = document.querySelector('.animais-lista')
lista.parentElement // pai
lista.parentElement.parentElement // pai do pai
lista.previousElementSibling // elemento acima
lista.nextElementSibling // elemento abaixo
lista.children // HTMLCollection com os filhos
lista.children[0] // primeiro filho
lista.children[--lista.children.length] // último filho ou
lista.children[lista.children.length - 1]
lista.querySelectorAll('li') // todas as LI's
lista.querySelector('li:last-child') // último filho
```

## Element vs Node.

Element's represetam um elemento html, ou seja, uma tag. Node representa um nó, e pode ser um elemento (Element), texto, comentário, quebra de linha e mais.

```js
const lista = document.querySelector('.animais-lista')
lista.previousElementSibling // elemento acima
lista.previousSibling // node acima
lista.firstChild // primeiro node child
lista.childNodes // todos os node child
```

> Geralmente estamos atrás de um elemento e não de qualquer node em si.

## Manipulando Elementos.

É possível mover elementos dentro do DOM.

```js
const lista = document.querySelector('.animais-lista')
const contato = document.querySelector('.contato')
const titulo = contato.querySelector('.titulo')
contato.appendChild(lista) // move lista para o final de contato
contato.insertBefore(lista, titulo) // insere a lista antes de titulo
contato.removeChild(titulo) // remove titulo de contato
contato.replaceChild(lista, titulo) // substitui titulo por
lista
```

## Novos Elementos.

Podemos criar novos elementos dentro do DOM com o método **createElement()**.

```js
const animais = document.querySelector('.animais')
const novoH1 = document.createElement('h1')
novoH1.innerText = 'Novo Título'
novoH1.classList.add('titulo')
animais.appendChild(novoH1)
```

## Clonar Elementos.

Todo elemento selecionado é único. Para criarmos um novo elemento baseado no anterior, é necessário utilizar o método **cloneNode()**.

```js
const titulo = document.querySelector('h1')
const titulo2 = document.querySelector('h1')
const novoTitulo = titulo
// titulo, titulo2 e novoTitulo são iguais
const cloneTitulo = titulo.cloneNode(true)
const contato = document.querySelector('.contato')
contato.appendChild(cloneTitulo)
```

> **true** sinaliza para incluir os filhos.

## Exercício.

```js
// Duplique o menu e adicione ele em copy
const $menu = document.querySelector('.menu')
const $copy = document.querySelector('.copy')
const menuCopy = $menu.cloneNode(true)
$copy.appendChild(menuCopy)

// Selecione o primeiro DT da dl de Faq
const $faq = document.querySelector('.faq-lista')
const $dt = $faq.firstElementChild

// Selecione o DD referente ao primeiro DT
const $dd = $dt.nextElementSibling

// Substitua o conteúdo html de .faq pelo de .animais
const $animals = document.querySelector('.animais')
$faq.innerHTML = $animals.innerHTML
```

# Navegação por Tabs.

Apartir daqui daremos seguimento no que vimos nos 3 primeiros módulos. E assim iremos fazer uma navegação por tabs.

## Adicionar Classes para Manipulação.

A ideia de navegação por tabs, é ter uma lista de itens que controla a visualização de uma lista de conteúdo. Cada item da lista possui um conteúdo relacionado ao mesmo.

```html
<!-- Primeiro, adicionar classes que irão
facilitar a manipulação dos elementos -->
<ul class="animais-lista js-tabmenu">
  ...
</ul>
<div class="animais-descricao js-tabcontent">
  ...
</div>
```

## Selecionar os items.

```js
const tabMenu = document.querySelectorAll('js-tabmenu li')
const tabContent = document.querySelectorAll('js-tabmenu section')
```

Com os items já selecionados vamos criar uma função **activeTabs** que irá receber um parâmetro que será o **index** do elemento que está sendo clicado no momento.

```js
function activeTab(index) {
  tabContent.forEach(content => {
    content.classList.remove('ativo')
  })
  tabContent[index].classList.add('ativo')
}
```

Iremos pecorer os elementos contidos dentro da variável **tabContent** onde vamos adicionar uma classe chamada **ativo** para o elemento.

## Adicionar o Evento.

Agora vamos adicionar um listener de evento em **tabMenu** que quando o elemento for clicado chamara a nossa função **activeTab**, assim adicionado a classe ativo ao elemento clicado.

```js
tabMenu.forEach((itemMenu, index) => {
  itemMenu.addEventListener('click', () => {
    activeTab(index)
  })
})
```

> Dentro do addEventListener, passamos o click e uma arrow function e dentro do corpo da arrow function que chamamos a nossa função activeTab e passamos o index do elemento que está sendo clicado.

## Assim que Carregar.

Podemos adicionar a classe ativo ao primeiro elemento e adicionar a classe js ao html. Assim identificamos se o JavaScript está habilitado ou não dentro da página.

```html
<!-- No head do borwser -->
<script>
  document.documentElement.className += ' js'
</script>
```

Com isso fazemos uma pequena verificação que verifica se o elemento tabContent e tabMenu existem dentro da nossa página.

```js
// Verificar se existe elemento em tabContent e tabMenu
if (tabContent.length && tabMenu.length) {
  tabContent[0].classList.add('ativo')
  // ..
}
```

## Animação com CSS.

Faremos uma pequena animação onde o nosso css, sai de **display none** para **display block**.

```css
.js .js-tabcontent section {
  display: none;
}
.js-tabcontent section.ativo {
  display: block !important;
  animation: show 0.5s forwards;
}
@keyframes show {
  from {
    opacity: 0;
    transform: translate3d(-30px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0px, 0, 0);
  }
}
```
