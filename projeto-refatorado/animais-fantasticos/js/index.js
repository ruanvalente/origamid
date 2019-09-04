import initScrollSection from './modules/initScrollSection.js';
import Scroll from './modules/initScroll.js';
import Tab from './modules/initTab.js';
import Accordion from './modules/initAccordion.js';
import Modal from './modules/initModal.js';
import initTooltip from './modules/initTooltip.js';
import initDropdownMenu from './modules/initDropdownMenu.js';
import initMenuMobile from './modules/initMenuMobile.js';
import initFetchAnimals from './modules/initFetchAnimals.js';
import initFetchBitcoins from './modules/initFetchBitcoins.js';

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

initScrollSection();
initTooltip();
initDropdownMenu();
initMenuMobile();
initFetchAnimals();
initFetchBitcoins();
