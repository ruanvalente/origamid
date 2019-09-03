export default function initTab() {
  const $tabMenu = document.querySelectorAll('[data-js="tabmenu"] li');
  const $tabContent = document.querySelectorAll('[data-js="content"] section');

  function activeTab(index) {
    $tabContent.forEach(element => element.classList.remove('ativo'));
    const direction = $tabContent[index].dataset.anime;
    $tabContent[index].classList.add('ativo', direction);
  }
  if ($tabContent.length && $tabMenu.length) {
    $tabContent[0].classList.add('ativo');

    $tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => {
        activeTab(index);
      });
    });
  }
}
