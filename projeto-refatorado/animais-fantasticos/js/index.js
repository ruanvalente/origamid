import initScrollSection from './modules/initScrollSection.js';
import InitScroll from './modules/initScroll.js';
import InitTab from './modules/initTab.js';
import InitAccordion from './modules/initAccordion.js';
import initModal from './modules/initModal.js';
import initTooltip from './modules/initTooltip.js';
import initDropdownMenu from './modules/initDropdownMenu.js';
import initMenuMobile from './modules/initMenuMobile.js';
import initFetchAnimals from './modules/initFetchAnimals.js';
import initFetchBitcoins from './modules/initFetchBitcoins.js';

const initScroll = new InitScroll('[data-js="menu"] a[href^="#"]');
initScroll.init();

const initAccordion = new InitAccordion('[data-js="accordion-list"] dt');
initAccordion.init();

const initTab = new InitTab(
  '[data-js="tabmenu"] li',
  '[data-js="content"] section'
);
initTab.init();

initScrollSection();
initModal();
initTooltip();
initDropdownMenu();
initMenuMobile();
initFetchAnimals();
initFetchBitcoins();
