# Javascript Para iniciantes

## Variáveis.

Responsáveis por guardar dados na mémoria.

Inicia com a palavra reservada: **var**, **let** ou **const**. Cada uma delas tem o seu significado dentro do Javascript, porém vamos ver mais a fundo esses conceitos mais a frente.

Ex:

```js
var nome = 'Ruan',
let idade = 24,
const possuiFaculdade = false
```

Neste exemplo estamos usando as três formas de se declarar uma variável dentro do Javascript. Porém o formato que vamos utilizar agora no início do curso será a **var**.

## Evitando repetições.

DRY Don't repeat yourself, esse conceito é amplamente utilizado dentro da programação, pois estamos dizendo que precisamos evitar repetições desnecessárias dentro do nosso código com a declaração de variáveis desnecessárias.

Quando queremos escrever mais de uma variável podemos utilizar a vírgula.

Ex:

```js
var nome = 'Ruan',
  sobrenome = 'Valente',
  idade = 24;
```

Dessa forma temos 3 variáveis criadas ao mesmo tempo.

Dentro do Javascript quando criamos uma variável e não atribuimos nenhum valor para ela a mesma assume o seu valor como undefined. Que significa sem valor definido.

Ex:

```js
var semValor;
```

Agora nossa variável tem o valor undefined.

## Nomes de variáveis.

- Os nomes podem iniciar com: \$, \_, ou letra.

  - Podem conter números mas não podemos iniciar eles na hora da nomeação da variavel.

- Case Sensitive.

  - Significa que o nome da nossa variável, função, Objeto etc.. é diferenciado de maiuscula e minuscula. Como minhaVariavel é diferente de MinhaVariavel. Apesar de ambas terem o mesmo nome.

- Não utilizar palavras reservadas.

  - Em Javascript existem inumeras palavras reservadas da linguagem e você não pode utilizar alguma delas: class, var, const, let etc.. para fazer a nomeação das suas variáveis.

- CamelCase.
  - Javascript segue o padrão chamado CamelCase, uma variável que tem o nome composto, ela ficaria dessa forma: minhaVariavel.

## Hoisting.

Hoisting faz o processo de elevação da variável e só faz a atribuição no momento no qual ela foi chamada.

```js
var nome;
console.log(nome); // undefined
nome = 'Ruan';
console.log(nome); // Ruan
```

Quando chamamos o console.log para mostra o conteúdo da variável nome, o Hoisting acontece elevando a variável até o topo mais auto do nosso código Javascript. Assim aparti daquele momento o conteúdo da variável nome ainda não existe e somente no exato momento que ela é atribuida o conteúdo de nome passa a existir e deixando de ser undefined.

Podemos redeclarar as nossas variáveis usando **var**, porém com **let** e **const** isso muda um pouco.

```js
var test = 'Test';
test = 'novo test';
console.log(test); // 'novo test';

let novoTest = 'novo test com let';
console.log(novoTest); // 'novo test com let'

let novoTest = 'agora vai dar erro';
console.log(novoTest); // SyntaxError: Identifier 'novoTest' has already been declared

const novoTestConst = 'novo test';
novoTestConst = 'vai da erro também';
console.log(novoTestConst); //TypeError: Assignment to constant variable.
```

Com var podemos redeclarar as nosas variáves agora com let, podemos apenas reatribuir o valor, com o const não podemos fazer isso, pois é uma constante ( mas que na verdade da pra muda mas de outra forma)

# Tipos de dados.

Dentro do Javascript existem alguns tipos uns são primitivos e outros são objetos.

Um tipo primitivo é basicamente onde o seu dado é imutável

### Tipos primitivos.

- String
- Number
- Boolean
- Undefined
- Null
- Symbol

Os objetos são todos os outros:

- Object
- RegExp
- Function
- Array

Podemos verificar o tipo de dado atráves do operador **typeof**:

```js
console.log(typeof 'Ola'); // string
```

Esse tipo de checagem serve apenas tipos primitivos, veremos outras abordagem para checar se determinado valor é de determinado tipo.

## Strings

Podemos somar uma string e assim concatenar as palavras.

```js
var nome = 'Ruan';
var sobrenome = 'Valente';
var nomeCompleto = nome + ' ' + sobrenome;
```

```js
var gols = 1000;
var frase = 'Romário fez ' + gols + ' gols';
```

### Aspas Duplas, Simples e Template String.

```js
'JavaScript é "super" fácil';
"JavaScript é 'super' fácil";
"JavaScript é \"super\" fácil";
`JavaScript é "super" fácil"`;
"JavaScript é "super" fácil"; // Inválido
```

## Template String.

```js
var gols = 1000;
var frase1 = 'Romário fez ' + gols + ' gols';
var frase2 = `Romário fez ${gols} gols`;
```

Uma forma mais elegante de se concatenar String dentro do Javascript. Onde passamos uma variável para dentro de uma expressão \${gols} que retorna o seu valor contido.

# Números e operadores.

### Números.

```js
var idade = 28;
var gols = 1000;
var pi = 3.14; // ponto para decimal
var exp = 2e10; // 20000000000
```

### Operadores Aritméticos.

```js
var soma = 100 + 50; // 150
var subtracao = 100 - 50; // 50
var multiplicacao = 100 * 2; // 200
var divisao = 100 / 2; // 50
var expoente = 2 ** 4; // 16
var modulo = 14 % 5; // 4
```

### Operadores Aritméticos (Strings).

```js
var soma = '100' + 50; // 10050
var subtracao = '100' - 50; // 50
var multiplicacao = '100' * '2'; // 200
var divisao = 'Comprei 10' / 2; //NaN (Not a Number)
```

É possível verificar se uma variável é NaN ou não com a função **isNaN()**

### NaN = Not a Number.

```js
var numero = 80;
var unidade = 'kg';
var peso = numero + unidade; // '80kg'
var pesoPorDois = peso / 2; // NaN (Not a Number)
```

### A ordem importa.

Começa por multiplicação e divisão, depois por soma e subtração.

```js
var total1 = 20 + 5 _ 2; // 30
var total2 = (20 + 5) _ 2; // 50
var total3 = 20 / 2 _ 5; // 50
var total4 = 10 + 10 _ 2 + 20 / 2; // 40
```

### Parênteses para priorizar uma expressão.

Operadores Aritméticos Unários

```js
var incremento = 5;
console.log(incremento++); // 5
console.log(incremento); // 6
var incremento2 = 5;
console.log(++incremento2); // 6
console.log(incremento2); // 6
```

Mesma coisa para o decremento **--x**

##Operadores Aritméticos Unários.
O + e - tenta transformar o valor seguinte em número.

```js
var frase = 'Isso é um teste';
+frase; // NaN
-frase; // NaN
var idade = '28';
+idade; // 28 (número)
-idade; // -28 (número)
console.log(+idade + 5); // 33
var possuiFaculdade = true;
console.log(+possuiFaculdade); // 1
```

O - antes de um número torna ele negativo.

[Guia Completo de Operadores](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_Operators)

# Boolean.

Existem dois valores booleanos true ou false.

```js
var possuiGraduacao = true;
var possuiDoutorado = false;
```

## Condicionais If e Else.

Vericar se uma expressão é verdadeira com if , caso contrário o else será ativado.

```js
var possuiGraduacao = true;
if (possuiGraduacao) {
  console.log('Possui graduação');
} else {
  console.log('Não possui graduação');
}
// retorna Possui Graduação e não executa o else
```

O valor dentro dos parênteses sempre será avaliado em true ou false.

Se o if não for verdadeiro, ele testa o else if

```js
var possuiGraduacao = true;
var possuiDoutorado = false;
if (possuiDoutorado) {
  console.log('Possui graduação e doutorado');
} else if (possuiGraduacao) {
  console.log('Possui graduação, mas não possui doutorado');
} else {
  console.log('Não possui graduação');
}
// retorna Possui Graduação, mas não possui doutorado
```

# Switch

Com o switch você pode veri car se uma variável é igual à diferentes valores utilizando o case . Caso ela seja igual, você pode fazer alguma coisa e utilizar a palavra chave break; para cancelar a continuação. O valor de default ocorrerá caso nenhuma das anteriores seja verdadeira.

```js
var corFavorita = 'Azul';
switch (corFavorita) {
  case 'Azul':
    console.log('Olhe para o céu.');
    break;
  case 'Vermelho':
    console.log('Olhe para rosas.');
    break;
  case 'Amarelo':
    console.log('Olhe para o sol.');
    break;
  default:
    console.log('Feche os olhos');
}
```

# Truthy e Falsy

Existem valores que retornam true e outros que retornam false quando veri cados em uma expressão booleana.

```js
// Falsy
if(false)
if(0) // ou -0
if(NaN)
if(null)
if(undefined)
if('') // ou "" ou ``
```

> Todo o restante é truthy.

# Truthy

```js
// Truthy
if(true)
if(1)
if(' ')
if('andre')
if(-5)
if({})
```

# Operador Lógico de Negação !

O operador ! , nega uma operação booleana. Ou seja, !true é igual a false.

```js
// Truthy
if(!true) // false
if(!1) // false
if(!'') // true
if(!undefined) // true
if(!!' ') // true
if(!!'') // false
```

> Dica, você pode utilizar o !! para verificar se uma expressão é Truthy ou Falsy

# Operadores de comparação

Faz a comparação dos valores e sempre retornar um valor booleano.

```js
10 > 5; // true
5 > 10; // false
20 < 10; // false
10 <= 10; // true
10 >= 11; // false
```

O == faz uma comparação não estrita e o === faz a comparação estrita, ou seja, verificando também pelo tipo de dado comparado.

```js
10 == '10'; // true
10 === '10'; // false
10 != '10'; // false
10 !== '10'; // true
```

# Operadores Lógicos &&

**&&** Compara se uma expressão e a outra é verdadeira.

```js
true && true; // true
true && false; // false
false && true; // false
'Gato' && 'Cão'; // 'Cão'
5 - 5 && 5 + 5; // 0
'Gato' && false; // false
5 >= 5 && 3 < 6; // true
```

Se ambos os valores forem true ele irá retornar o último valor verificado Se algum valor for false ele irá retornar false.

# Operadores Lógicos ||

**||** Compara se uma expressão ou outra é verdadeira

```js
true || true; // true
true || false; // true
false || true; // true
'Gato' || 'Cão'; // 'Gato'
5 - 5 || 5 + 5; // 10
'Gato' || false; // Gato
5 >= 5 || 3 < 6; // true
```

Retorna o primeiro valor true que encontrar.

# Funções

Bloco de código que pode ser executado e reutilizado. Valores podem ser passados por uma função e a mesma retorna outro valor.

```js
function areaQuadrado(lado) {
  return lado * lado;
}
areaQuadrado(4); // 16
areaQuadrado(5); // 25
areaQuadrado(2); // 4
```

> Chamada de function declaration

```js
function pi() {
  return 3.14;
}
var total = 5 * pi(); // 15.7
```

> Parênteses () executam uma função

# Parâmetros e Argumentos

Ao criar uma função, você pode de definir parâmetros. Ao executar uma função, você pode passar argumentos .

```js
// peso e altura são os parâmetros
function imc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc;
}
imc(80, 1.8); // 80 e 1.80 são os argumentos
imc(60, 1.7); // 60 e 1.70 são os argumentos
```

> Separamos por vírgula cada parâmetro. Você pode definir mais de um parâmetro ou nenhum.

# Parênteses executa a função

```js
function corFavorita(cor) {
  if (cor === 'azul') {
    return 'Você gosta do céu';
  } else if (cor === 'verde') {
    return 'Você gosta de mato';
  } else {
    return 'Você não gosta de nada';
  }
}
corFavorita(); // retorna 'Você não gosta de nada'
```

> Se apenas definirmos a função com o function e não executarmos a mesma, nada que estiver dentro dela irá acontecer.

# Argumentos podem ser funções

Chamadas de Callback, geralmente são funções que ocorrem após algum evento.

```js
addEventListener('click', function() {
  console.log('Clicou');
});
// A função possui dois argumentos
// Primeiro é a string 'click'
// Segundo é uma função anônima
```

> Funções anônimas são aquelas em que o nome da função não é definido, escritas como function() {} ou () => {}

# Pode ou não retornar um valor

Quando não de definimos o return, ela irá retornar undefined. O código interno da função é executado normalmente, independente de existir valor de return ou não.

```js
function imc(peso, altura) {
  const imc = peso / altura ** 2;
  console.log(imc);
}
imc(80, 1.8); // retorna o imc
console.log(imc(80, 1.8)); // retorna o imc e undefined
```

# Valores retornados

Uma função pode retornar qualquer tipo de dado e até outras funções.

```js
function terceiraIdade(idade) {
  if (typeof idade !== 'number') {
    return 'Informe a sua idade!';
  } else if (idade >= 60) {
    return true;
  } else {
    return false;
  }
}
```

> Cuidado, retornar diferentes tipos de dados na mesma função não é uma boa ideia.

# Escopo

Variáveis e funções de nidas dentro de um bloco {} , não são visíveis fora dele.

```js
function precisoVisitar(paisesVisitados) {
  var totalPaises = 193;
  return `Ainda faltam ${totalPaises - paisesVisitados} paises para visitar`;
}
console.log(totalPaises); // erro, totalPaises não definido
```

# Escopo Léxico

Funções conseguem acessar variáveis que foram criadas no contexto pai.

```js
var profissao = 'Designer';
function dados() {
  var nome = 'André';
  var idade = 28;
  function outrosDados() {
    var endereco = 'Rio de Janeiro';
    var idade = 29;
    return `${nome}, ${idade}, ${endereco}, ${profissao}`;
  }
  return outrosDados();
}
dados(); // Retorna 'André, 29, Rio de Janeiro, Designer'
outrosDados(); // retorna um erro
```

# Hoisting

Antes de executar uma função, o JS 'move' todas as funções declaradas para a memória

```js
imc(80, 1.8); // imc aparece no console
function imc(peso, altura) {
  const imc = peso / altura ** 2;
  console.log(imc);
}
```

# Objetos

Conjunto de variáveis e funções, que são chamadas de propriedades e métodos.

```js
var pessoa = {
  nome: 'André',
  idade: 28,
  profissao: 'Designer',
  possuiFaculdade: true
};
pessoa.nome; // 'André'
pessoa.possuiFaculdade; // true
```

> Propriedades e métodos consistem em nome (chave) e valor

# Métodos

É uma propriedade que possui uma função no local do seu valor.

```js
var quadrado = {
  lados: 4,
  area: function(lado) {
    return lado * lado;
  },
  perimetro: function(lado) {
    return this.lados * lado;
  }
};
quadrado.lados; // 4
quadrado.area(5); // 25
quadrado.perimetro(5); // 20
```

# Métodos

Abreviação de area: function() {} para area() {} , no ES6+

```js
var quadrado = {
  lados: 4,
  area(lado) {
    return lado * lado;
  },
  perimetro(lado) {
    return this.lados * lado;
  }
};
```

# Organizar o Código

Objetos servem para organizar o código em pequenas partes reutilizáveis.

```js
Math.PI; // 3.14
Math.random(); // número aleatório
var pi = Math.PI;
console.log(pi); // 3.14
```

> Math é um objeto nativo de JavaScript. Já percebeu que console é um objeto e log() um método.

# Criar um Objeto

Um objeto é criado utilizando as chaves {}

```js
var carro = {};
var pessoa = {};
console.log(typeof carro); // 'object'
```

OBS: Para fazermos checagem de tipos podemos usar o prototype do objeto chamando o método toString assim retornando o tipo real do objeto.

```js
Object.prototype.toString.call(null); // [object Null]
```

Assim podemos checar o objeto null pois com o typeof não temos 100% de certeza qual é o tipo do objeto passado.

```js
typeof null; // 'object'
```

Notaram a diferença ? ;)

# Dot Notation Get

Acesse propriedades de um objeto utilizando o ponto .

```js
var menu = {
  width: 800,
  height: 50,
  backgroundColor: '#84E'
};
var bg = menu.backgroundColor; // '#84E'
```

Substitua o valor de uma propriedade utilizando **.** e o **=** após o nome da mesma.

```js
var menu = {
  width: 800,
  height: 50,
  backgroundColor: '#84E'
};
menu.backgroundColor = '#000';
console.log(menu.backgroundColor); // '#000'
```

# Adicionar Propriedades e Métodos

Basta adicionar um novo nome e definir o valor.

```js
var menu = {
  width: 800
};
menu.height = 50;
menu.position = 'fixed';
```

# Palavra-chave this

this irá fazer uma referência ao próprio objeto.

```js
var height = 120;
var menu = {
  width: 800,
  height: 50,
  metadeHeight() {
    return this.height / 2;
  }
};
menu.metadeHeight(); // 25
// sem o this, seria 60
```

> this referencia o proprio objeto.

# Protótipo e Herança

O objeto herda propriedades e métodos do objeto que foi utilizado para criar o mesmo.

```js
var menu = {
  width: 800
};
menu.hasOwnProperty('width'); // true
menu.hasOwnProperty('height'); // false
```

> hasOwnProperty é um método de Object.

# Tudo é Objeto

Strings, Números, Boolean, Objetos e mais, possuem propriedades e métodos. Por isso são objetos.

```js
var nome = 'André';
nome.length; // 5
nome.charAt(1); // 'n'
nome.replace('ré', 'rei'); // 'Andrei'
nome; // 'André'
```

> Uma string herda propriedades e métodos do construtor String().

# Números

```js
var altura = 1.8;
altura.toString(); // '1.8'
altura.toFixed(); // '2'
```

> Por um breve momento o número é envolvido em um Objeto (coerção), tendo acesso assim as suas propriedades e métodos.

# Funções

```js
function areaQuadrado(lado) {
  return lado * lado;
}
areaQuadrado.toString();
//"function areaQuadrado(lado) {
//
return lado * lado;
//}"
areaQuadrado.length; // 1
```

# Elementos do DOM

```html
<a class="btn">Clique</a>
```

```js
var btn = document.querySelector('.btn');
btn.classList.add('azul'); // adiciona a classe azul
btn.innerText; // 'Clique'
btn.addEventListener('click', function() {
  console.log('Clicou');
});
```

> Praticamente todos os efeitos com JS são feitos utilizando propriedades e métodos de objetos do DOM.

Objetos revolucionaram a programação. Web API's são métodos e propriedades que permitem a interação JavaScript e Browser.

# Array

É um grupo de valores geralmente relacionados. Servem para guardarmos diferentes valores em uma única variável.

```js
var videoGames = ['Switch', 'PS4', 'XBox'];
videoGames[0]; // Switch
videoGames[2]; // Xbox
```

> Acesse um elemento da array utilizando array[index]

# Métodos e Propriedades de uma Array

```js
var videoGames = ['Switch', 'PS4', 'XBox'];
videoGames.pop(); // Remove o último item e retorna ele
videoGames.push('3DS'); // Adiciona ao final da array
videoGames.length; // 3
```

Existem diversos outros métodos, como **map**, **reduce**, **forEach** e mais que veremos mais à frente.

# For Loop

Fazem algo repetidamente até que uma condição seja atingida.

```js
for (var numero = 0; numero < 10; numero++) {
  console.log(numero);
  // Retorna de 0 a 9 no console
}
```

> O for loop possui 3 partes,**início**, **condição** e **incremento**

# While Loop

Outra maneira de realizamos um loop o while executa enquanto determinada condição for verdadeira.

```js
var i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

// Retorna de 0 a 9 no console, O for loop é o mais comum.

Vejamos um exemplo usando o loop for.

```js
var videoGames = ['Switch', 'PS4', 'XBox', '3DS'];
for (var i = 0; i < videoGames.length; i++) {
  console.log(videoGames[i]);
}
/*
 Switch
 PS4
 XBox
 3DS
*/
```

# Break.

O loop irá parar caso encontro e palavra break.

```js
var videoGames = ['Switch', 'PS4', 'XBox', '3DS'];
for (var i = 0; i < videoGames.length; i++) {
  console.log(videoGames[i]);
  if (videoGames[i] === 'PS4') {
    break;
  }
}
```

# forEach

forEach é um método que executa uma função para cada item da Array. É uma forma mais simples de utilizarmos um loop com arrays (ou array-like).

```js
var videoGames = ['Switch', 'PS4', 'XBox', '3DS'];
videoGames.forEach(function(item) {
  console.log(item);
});
/*
O argumento item será atribuído dinamicamente
 Switch
 PS4
 XBox
 3DS
*/
```

> Podemos passar os seguintes parâmetros item , index e array.

Não se confunda com a sintaxe.

```js
var numero = 0;
var maximo = 50;
for (; numero < maximo; ) {
  console.log(numero);
  numero++;
}
```

> Não aconselho escrever da forma acima, mas funciona normalmente.

# Comentários.

Servem para explicar o código.

```js
// Comentário de uma linha
/*
Comentário
com diversas
linhas
*/
// var nome = 'André';
```

> Comentar uma linha de código desativa a mesma. Não deixe linhas de código comentadas no arquivo final.

# Operadores de Atribuição.

Podem funcionar como formas abreviadas.

```js
var x = 5;
var y = 10;
x += y; // x = x + y (15)
x -= y; // x = x - y (-5)
x *= y; // x = x * y (50)
x /= y; // x = x / y (0.5)
x %= y; // x = x % y (0)
x **= y; // x = x ** y (9765625)
```

# Operador Ternário.

O operador condicional (ternário) é o único operador JavaScript que possui três operandos. Este operador é frequentemente usado como um atalho para a instrução if.

```js
var idade = 19;
var podeBeber = idade >= 18 ? 'Pode beber' : 'Não pode beber';
console.log(podeBeber); // Pode beber
// condição ? true : false
```

> Geralmente utilizado quando precisamos atribuir um valor para uma variável, dependendo de uma condição.

# If Abreviado.

Não é necessário abrir e fechar as chaves {} quando retornamos apenas uma linha de código

```js
var possuiFaculdade = true;
if (possuiFaculdade) console.log('Possui faculdade');
else console.log('Não possui faculdade');
// ou
if (possuiFaculdade) console.log('Possui faculdade');
else console.log('Não possui faculdade');
```

> Eu particularmente prefiro a segunda opção aqui.

# Escopo de Função

Variáveis declaradas dentro de funções não são acessadas fora
das mesmas.

```js
function mostrarCarro() {
  var carro = 'Fusca';
  console.log(carro);
}
mostrarCarro(); // Fusca no console
console.log(carro); // Erro, carro is not defined
```

> Escopo evita o conflito entre nomes.

# Variável Global (Erro)

Declarar variáveis sem a palavra chave var , const ou let , cria uma variável que pode ser acessar em qualquer escopo (global). Isso é um erro.

```js
function mostrarCarro() {
  carro = 'Fusca';
  console.log(carro);
}
mostrarCarro(); // Fusca
console.log(carro); // Fusca
```

> A diretiva 'use strict' impede isso.

# Escopo de Função (Pai)

Variáveis declaradas no escopo pai da função, conseguem ser acessadas pelas funções.

```js
var carro = 'Fusca';
function mostrarCarro() {
  var frase = `Meu carro é um ${carro}`;
  console.log(frase);
}
mostrarCarro(); // Meu carro é um Fusca
console.log(carro);
// Fusca
```

# Escopo de Bloco

Variáveis criadas com var , vazam o bloco. Por isso com a introdução do ES6 a melhor forma de declarmos uma variável é utilizando const e let , pois estas respeitam o escopo de bloco.

```js
if (true) {
  var carro = 'Fusca';
  console.log(carro);
}
console.log(carro); // Carro
```

# Var Vaza o Bloco

Mesmo com a condição falsa, a variável ainda será declarada utilizando hoisting e o valor cará como undefined.

```js
if (false) {
  var carro = 'Fusca';
  console.log(carro);
}
console.log(carro); // undefined
```

# Const e Let no lugar de Var

A partir de agora vamos utilizar apenas const e let para declarmos variáveis.

```js
if (true) {
  const carro = 'Fusca';
  console.log(carro);
}
console.log(carro); // erro, carro is not defined
```

# {} cria um bloco

Chaves {} criam um escopo de bloco, não confundir com a criação de objetos = {}.

```js
{
  var carro = 'Fusca';
  const ano = 2018;
}
console.log(carro); // Carro
console.log(ano); // erro ano is not defined
```

# For Loop

Ao utilizar var dentro de um for loop, que é um bloco, o valor do variável utilizada irá vazar e existir fora do loop.

```js
for (var i = 0; i < 10; i++) {
  console.log(`Número ${i}`);
}
console.log(i); // 10
```

# For Loop com Let

Com o **let** evitamos que o número vaze.

```js
for (let i = 0; i < 10; i++) {
  console.log(`Número ${i}`);
}
console.log(i); // i is not defined
```

# Const

Mantém o escopo no bloco, impede a redeclaração e impede a modicação do valor da variável, evitando bugs no código.

```js
const mes = 'Dezembro';
mes = 'Janeiro'; // erro, tentou modificar o valor
const semana; // erro, declarou sem valor
const data = {
  dia: 28,
  mes: 'Dezembro',
  ano: 2018
}
data.dia = 29; // Funciona
data = 'Janeiro'; // erro
```

> Variáveis com valores constantes devem utilizar o const.

# Let.

Mantém o escopo no bloco, impede a redeclaração, mas permite a modicação do valor da variável.

```js
let ano;
ano = 2018;
ano++;
console.log(ano); // 2019
let ano = 2020; // erro, redeclarou a variável
```

> Geralmente vamos utilizar o const.
