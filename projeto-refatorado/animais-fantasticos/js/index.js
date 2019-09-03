import initScrollSection from './modules/initScrollSection.js';
import InitScroll from './modules/initScroll.js';
import initTab from './modules/initTab.js';
import initAccordion from './modules/initAccordion.js';
import initModal from './modules/initModal.js';
import initTooltip from './modules/initTooltip.js';
import initDropdownMenu from './modules/initDropdownMenu.js';
import initMenuMobile from './modules/initMenuMobile.js';
import initFetchAnimals from './modules/initFetchAnimals.js';
import initFetchBitcoins from './modules/initFetchBitcoins.js';

const initScroll = new InitScroll('[data-js="menu"] a[href^="#"]');
initScroll.init();

initScrollSection();
initTab();
initAccordion();
initModal();
initTooltip();
initDropdownMenu();
initMenuMobile();
initFetchAnimals();
initFetchBitcoins();
