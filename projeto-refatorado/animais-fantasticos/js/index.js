import ScrollSection from './modules/initScrollSection.js';
import Scroll from './modules/initScroll.js';
import Tab from './modules/initTab.js';
import Accordion from './modules/initAccordion.js';
import Modal from './modules/initModal.js';
import Tooltip from './modules/initTooltip.js';
import DropdownMenu from './modules/initDropdownMenu.js';
import MenuMobile from './modules/initMenuMobile.js';
import fetchAnimals from './modules/initFetchAnimals.js';
import fetchBitcoins from './modules/initFetchBitcoins.js';

const scroll = new Scroll('[data-js="menu"] a[href^="#"]');
scroll.init();

const accordion = new Accordion('[data-js="accordion-list"] dt');
accordion.init();

const tab = new Tab('[data-js="tabmenu"] li', '[data-js="content"] section');
tab.init();

const modal = new Modal(
  '[data-js="abrir-modal"]',
  '[data-js="modal-container"]',
  '[data-js="fechar-modal"]'
);
modal.init();

const tooltip = new Tooltip('[data-js="tooltip"]');
tooltip.init();

const scrollSection = new ScrollSection('[data-js="scroll"]');
scrollSection.init();

const dropdownMenu = new DropdownMenu('[data-js="dropdown"]', [
  'touchstart',
  'click'
]);
dropdownMenu.init();

const menuMobile = new MenuMobile(
  '[data-js="button-menu"]',
  '[data-js="list-menu"]',
  ['click', 'touchstart']
);
menuMobile.init();

fetchAnimals('./animaisapi.json', '.numeros-grid');

fetchBitcoins('https://blockchain.info/ticker', '[data-js="bitcoin"]');
