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
