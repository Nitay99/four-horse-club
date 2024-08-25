const initCarouselSlider = () => {
  const slider = document.querySelector('.carousel-slider');
  const sliderList = slider && slider.querySelector('.carousel-slider__list');

  if (!slider && !sliderList) {
    return;
  }

  const sliderButtonRight = slider.querySelector('.carousel-slider__btn--right');
  const sliderButtonLeft = slider.querySelector('.carousel-slider__btn--left');
  const sliderFirstCard = sliderList.querySelector('.carousel-slider__item');
  const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
  const sliderListChildrens = [...sliderList.children];
  const cardPerView = firstCardWidth && Math.round(sliderList.offsetWidth / firstCardWidth);
  const totalSlides = slider.querySelector('.carousel-slider__number-total');
  const shownSlides = slider.querySelector('.carousel-slider__number-shown');
  let timeoutId = null;
  let mobileInit = null;
  let byScrollAutoPlayInit = null;

  if (sliderListChildrens && sliderListChildrens.length > 0) {
    totalSlides ? totalSlides.textContent = sliderListChildrens.length : null;

    sliderListChildrens.forEach((slide) => {
      slide.querySelector('button').setAttribute('tabindex', '-1');
    });

    if (shownSlides) {
      if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) > sliderListChildrens.length) {
        shownSlides.textContent = Math.round(sliderList.scrollLeft / (firstCardWidth + 20) - sliderListChildrens.length);
      } else if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === 0) {
        shownSlides.textContent = sliderListChildrens.length;
      } else {
        shownSlides.textContent = Math.round(sliderList.scrollLeft / (firstCardWidth + 20));
      }
    }

    if ((sliderListChildrens.length < 4 && window.innerWidth >= 1023) || (sliderListChildrens.length < 3 && window.innerWidth >= 767) || (sliderListChildrens.length < 2 && window.innerWidth < 767)) {
      shownSlides ? shownSlides.textContent = sliderListChildrens.length : null;

      sliderButtonRight ? sliderButtonRight.disabled = true : null;
      sliderButtonLeft ? sliderButtonLeft.disabled = true : null;
    } else {
      sliderListChildrens.slice(-cardPerView).reverse().forEach(card => {
        sliderList.insertAdjacentHTML('afterbegin', card.outerHTML);
      });
  
      sliderListChildrens.slice(0, cardPerView).forEach(card => {
        sliderList.insertAdjacentHTML('beforeend', card.outerHTML);
      });

      const sliderListItems = sliderList && sliderList.querySelectorAll('.carousel-slider__item');
      
      sliderListChildrens.forEach((slide, i) => {
        if (i < Math.round(sliderList.scrollLeft / (firstCardWidth + 20))) {
          slide.querySelector('button').setAttribute('tabindex', '0');
        } else {
          slide.querySelector('button').setAttribute('tabindex', '-1');
        }
      });

      const autoPlay = () => {
        timeoutId = setTimeout(() => {
          const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
          sliderList.scrollLeft += firstCardWidth;
        }, 4000);
      };
      
      if (slider.parentElement.getBoundingClientRect().top < 500 || byScrollAutoPlayInit === true) autoPlay();
  
      const infiniteScroll = () => {
        const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;

        if (sliderList.scrollLeft === 0) {
          sliderList.classList.add('carousel-slider__list--no-transition');
          sliderList.scrollLeft = sliderList.scrollWidth - (2 * sliderList.offsetWidth);
          sliderList.classList.remove('carousel-slider__list--no-transition');
        } else if (Math.ceil(sliderList.scrollLeft) === sliderList.scrollWidth - sliderList.offsetWidth || Math.ceil(sliderList.scrollLeft) - 1 === sliderList.scrollWidth - sliderList.offsetWidth || Math.ceil(sliderList.scrollLeft) === sliderList.scrollWidth - sliderList.offsetWidth - 1) {
          sliderList.classList.add('carousel-slider__list--no-transition');
          sliderList.scrollLeft = sliderList.offsetWidth;
          sliderList.classList.remove('carousel-slider__list--no-transition');
        }

        clearTimeout(timeoutId);

        if (slider.parentElement.getBoundingClientRect().top < 500 || byScrollAutoPlayInit === true) autoPlay();

        if (shownSlides) {
          if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) > sliderListChildrens.length) {
            shownSlides.textContent = Math.round(sliderList.scrollLeft / (firstCardWidth + 20) - sliderListChildrens.length);
          } else if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === 0) {
            shownSlides.textContent = sliderListChildrens.length;
          } else {
            shownSlides.textContent = Math.round(sliderList.scrollLeft / (firstCardWidth + 20));
          }
        }

        if (window.innerWidth > 1023) {
          mobileInit ? mobileInit = false : null;

          sliderListItems.forEach((slide, i) => {
            if (i === Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) || i > Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) && i < (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) + 3)) {
              slide.querySelector('button').setAttribute('tabindex', '0');
            } else {
              slide.querySelector('button').setAttribute('tabindex', '-1');
            }
          });

          if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === sliderListChildrens.length + 3) {
            sliderListItems.forEach((slide) => {
              slide.querySelector('button').setAttribute('tabindex', '-1');
            });

            sliderListChildrens.forEach((slide, i) => {
              if (i < 3) {
                slide.querySelector('button').setAttribute('tabindex', '0');
              } else {
                slide.querySelector('button').setAttribute('tabindex', '-1');
              }
            });
          }

          if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === 0) {
            sliderListItems.forEach((slide) => {
              slide.querySelector('button').setAttribute('tabindex', '-1');
            });

            sliderListChildrens.forEach((slide, i, arr) => {
              if (i < arr.length && i > arr.length - 4) {
                slide.querySelector('button').setAttribute('tabindex', '0');
              } else {
                slide.querySelector('button').setAttribute('tabindex', '-1');
              }
            });
          }
        } else {
          !mobileInit ? sliderListItems.forEach((slide) => {
            slide.querySelector('button').setAttribute('tabindex', '-1');
            mobileInit = true;
          }) : null;
        }
      };

      sliderList.addEventListener('scroll', infiniteScroll);

      document.addEventListener('scroll', () => {
        if (slider.parentElement.getBoundingClientRect().top < 500 && byScrollAutoPlayInit !== true) {
          clearTimeout(timeoutId);
          autoPlay();
          byScrollAutoPlayInit= true;
        }
      });

      sliderButtonRight && sliderButtonRight.addEventListener('click', () => {
        const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
        sliderList.scrollLeft += firstCardWidth + 20;
      });

      sliderButtonLeft && sliderButtonLeft.addEventListener('click', () => {
        const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
        sliderList.scrollLeft -= firstCardWidth + 20;
      });
    }
  }
};

export {initCarouselSlider};
