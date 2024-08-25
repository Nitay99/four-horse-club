import {initScrollLinks} from './modules/init-scroll-links.js';
import {initUnloopedSlider} from './modules/init-unlooped-slider.js';
import {initCarouselSlider} from './modules/init-carousel-slider.js';

window.addEventListener('DOMContentLoaded', () => {
  initScrollLinks();
  initUnloopedSlider();
  initCarouselSlider();
});
