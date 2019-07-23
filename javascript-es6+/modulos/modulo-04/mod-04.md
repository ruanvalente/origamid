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

// Crie 3 pessoas, João - 20 anos, Maria - 25 anos, Bruno - 15 anos

// Crie uma Constructor Function (DOM) para manipulação de listas de elementos do DOM. Deve Conter as seguintes propriedades e métodos.

/// Elements: Retorna uma NodeList com os elementos selecionados
// AddClass(classe): Adiciona a classe a todos os elementos
// removeClass(classe): Remove a classe a todos os elementos.
```
