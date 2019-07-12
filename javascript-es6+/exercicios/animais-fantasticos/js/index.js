'use strict'

const $menu = document.querySelector('.menu')
console.log($menu)
console.log($menu.className)
console.log($menu.classList)
$menu.classList.add('ativo')
$menu.classList.remove('ativo')
$menu.classList.toggle('ativo')
console.log($menu.classList.contains('ativo'))
$menu.classList.replace('ativo', 'inativo')
