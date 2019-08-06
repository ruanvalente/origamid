# Efeitos no DOM.

## Dataset.

## HTMLElement.

Todo elemento HTML do DOM herda propriedades e métodos do construtor HTMLElement.

```js
const h1 = document.querySelector('h1')
Object.prototype.toString.call(h1) // [object HTMLHeadingElement]
// HTMLHeadingElement > HTMLElement > Element > Node > EventTarget > Object
```

## Dataset.

**dataset** é uma propriedade de HTMLElement, essa propriedade é um objeto do tipo DOMStringMap. Dentro desse objeto existe uma coleção de chave / valor, com todos os atributos do elemento html que começarem com **data-**.

```html
<div data-cor="azul" data-width="500">Uma Div</div>
<span data-anime="left" data-tempo="2000">Um Span</span>
```

```js
// Ambos os valores selecionam a mesma div acima.
let div = document.querySelector('div')
div = document.querySelector('[data-cor]')
div = document.querySelector('[data-cor="azul"]')
div.dataset
// DOMStringMap {cor: "azul", width: "500"}
div.dataset.cor // 'azul'
div.dataset.width // '500'
div.dataset.tempo = 1000
// DOMStringMap {cor: "azul", width: "500", tempo: "1000"}
```

## Data Atributes.

Os atributos e valores que começam com data- poderão ser utilizados como forma de configuração de plugins e interações DOM / JS.

```html
<div data-anima="left" data-tempo="1000">Div 1</div>
<div data-anima="right" data-tempo="2000">Div 2</div>
```

```js
const divs = document.querySelectorAll('[data-anima]')
divs.forEach(div => {
  div.classList.add(div.dataset.anima)
})
// adiciona em cada div uma classe com o mesmo nome que o valor de data.
```

## Data vs Class.

A vantagem de se utilizar data atributes é que torna mais fácil evitamos conflitos com estilos do CSS. Além de deixar a estrutura da tag mais organizada.

```html
<div data-anima="left" data-tempo="1000">Div 1</div>
<div class="anima-left tempo-1000">Div 2</div>
```

## Nomenclatura.

Por padrão o Javascript não aceita - (traço), como caractere válido para nomear propriedades. Então qualquer traço será removido e a letra seguinte transformada em maiúscula.

```html
<div data-anima-scroll="left">Div 1</div>
```

```js
const div = document.querySelector('[data-anima-scroll]')

div.dataset
// {animaScroll: 'left'}

div.dataset.animaScroll // left
div.dataset.tempoTotal = 1000 // Na div vira data-tempo-total="1000"

delete div.dataset.animaScroll // remove o atributo
```

## Exercícios.

```js
// Adicione um atributo data-anime="show-down" e
// data-anime="show-right" a todos as section's
// com descricão dos animais.

// Utilizando estes atributos, adicione a classe
// show-down ou show-right a sua respectiva section
// assim que a mesma aparecer na tela (animacao tab)

// No CSS faça com que show-down anime de cima para baixo
// e show-right continue com a mesma animação da esquerda
// para a direita

// Substitua todas as classes js- por data atributes.
```

# Modules Introdução.

## Manutenção.

Dividir o código em diferentes arquivos com funções específicas (módulos) facilita a manutenção.

## Compartilhamento.

O compartilhamento de código com outros projetos é facilitado, pois basta você importar um módulo específico.

## Nativo no ES6+.

Ferramentas que permitem dividirmos o código em módulos já existem a bastante tempo. Grunt, Gulp, Webpack, Browserify, Parcel e outras. Mas agora os módulos são nativos.

## Modules ES6.

Basta adicionar **type="module"** na tag script do HTML. Utilize a palavra chave **export** na frente do valor que deseja exportar (use default se for único). E **import name from arquivo.js** para importar.

```html
<script type="module" src="js/script.js"></script>
```

```js
// arquivo scroll-suave.js
export default function scrollSuave() {
  // ...
}
```

```js
// arquivo script.js
import scrollSuave from './scroll-suave.js'
scrollSuave()
```

> Geralmente um valor por módulo.

## Named Exports

Você pode exportar mais de um valor. Quando for importar utilize as chaves para especificar cada valor. O nome importado deve ser igual ao exportado.

```js
// arquivo scroll.js
export function scrollSuave() {
  // ...
}
export function scrollAnimacao() {
  // ...
}
```

```js
// arquivo script.js
import { scrollSuave, scrollAnimacao } from './scroll.js'
scrollSuave()
scrollAnimacao()
```

```js
// Importe todos os valores em um objeto
import * as scroll from './scroll.js'
scroll.scrollSuave()
scroll.scrollAnimacao()
```

## Valores do Export.

Podemos exportar objetos, funções, classes, números, strings e mais.

```js
// arquivo configuracao.js
export function scrollSuave() {}
export const ano = 2000
export const obj = { nome: 'Ford' }
export const str = 'Frase'
export class Carro {}
```

```js
// arquivo script.js
import * as conf from './configuracao.js'
conf.str
conf.obj
conf.ano
```

## Características.

- **Strict Mode**.

  - 'use strict' por padrão em todos os arquivos.

- **Variáveis ficam apenas no module**.

  - Não vazam para o escopo global.

- **This fora de um objeto faz referência a undefined**.
  - Ao invés de fazer referência ao objeto window no caso ao escopo global, o this aqui é apontado para undefined. Por conta da diretiva **use strict**.

## Assícrono.

## use strict.

O modo use estrito previne de algumas ações consideradas erros dentro da linguagem. Basta adicionar **'use strict'** no topo de um arquivo, que ele entrará neste modo.

```js
'use strict'

nome = 'Ford' // erro, variável global
delete Array.prototype // erro, não deletável
window.top = 200 // erro, não pode mudar
const arguments = 3.14 // escrever em palavra reservada
```

> Por padrão todo module está no modo estrito.

## Exercícios.

```js
// Divida o projeto em diferentes módulos
```

# setTimeout e setInterval.

**setTimeout(callback, tempo, arg1, arg2, ...)** método assíncrono que ativa o callback após um **tempo** determinado. Não existe garantia que o código será executado extamente após o tempo, pois o callback entra na fila de espera pela **Call Stack** estar vazia.

```js
function espera(texto) {
  console.log(texto)
}
setTimeout(espera, 1000, 'Depois de 1s')
```

## Imediato

Se não passarmos o argumento de tempo ele irá assumir o valor de 0 e entrará na _fila_ imediatamente para ser executado. Podemos passar uma função anônima diretamente com argumento.

```js
setTimeout(() => {
  console.log('Após 0?s')
})
```

## Exemplos de setTimeout.

## Loops e setTimeout.

Um loop é executado rapidamente, em milissegundos. Se colocarmos um setTimeout dentro do loop, todos eles serão adicionado à Web API praticamente ao mesmo tempo. Um evento de setTimeout não espera o tempo do anterior acabar para iniciar.

```js
for (let i = 0; i < 20; i++) {
  setTimeout(() => {
    console.log(i)
  }, 300)
}
```

## Corrigindo o Loop.

Agora ele está multiplicando o tempo por i. Assim o primeiro aparecerá em 0ms, o segundo em 300ms o terceiro 600ms e assim por diante.

```js
for (let i = 0; i < 20; i++) {
  setTimeout(() => {
    console.log(i)
  }, 300 * i)
}
```

## This e Window.

setTimeout é um método do objeto Window. O valor de **this** dentro do mesmo callback é uma referência ao seu objeto no caso Window.

```js
const btn = document.querySelector('button')
btn.addEventListener('click', handleClick)
function handleClick(event) {
  setTimeout(function() {
    this.classList.add('active')
  }, 1000)
}
// Erro pois window.classList não existe
```

## Arrow Function.

Quando utilizamos uma Arrow Function como callback, o contexto de _this_ passa a ser do local onde o setTimeout foi iniciado.

```js
const btn = document.querySelector('button')
btn.addEventListener('click', handleClick)

// this agora é btn.
function handleClick(event) {
  setTimeout(() => {
    this.classList.add('active')
  }, 1000)
}
```

## setInterval.

**setInterval(callback, tempo, arg1, arg2, ...)**, irá ativar o callback toda vez que a quantidade de tempo passar.

```js
function loop(texto) {
  console.log(texto)
}
setInterval(loop, 1000, 'Passou 1s')
// loop a cada segundo
let i = 0
setInterval(() => {
  console.log(i++)
}, 1000)
```

## clearInterval.

**clearInterval(var)**, podemos para um intervalo com o clearInterval. Para isso precisamos atribuir o setInterval a uma variável.

```js
const contarAte10 = setInterval(callback, 1000)
let i = 0
function callback() {
  console.log(i++)
  if (i > 10) {
    clearInterval(contarAte10)
  }
}
```

## Exercícios.

```js
// Mude a cor da tela para azul e depois para vermelho a cada 2s.
// // Crie um cronometro utilizando o setInterval. Deve ser possível
// iniciar, pausar e resetar (duplo clique no pausar).
```
