const initCarouselSlider = () => {
  const sliders = document.querySelectorAll('.carousel-slider');

  if (!sliders || !(sliders.length > 0)) {
    return;
  }

  sliders.forEach(slider => {
    const sliderList = slider.querySelector('.carousel-slider__list');

    if (!sliderList) {
      return;
    }

    const sliderControls = slider.querySelector('.carousel-slider__controls');
    const sliderButtonLeft = sliderControls && sliderControls.querySelector('.carousel-slider__btn--left');
    const sliderButtonRight = sliderControls && sliderControls.querySelector('.carousel-slider__btn--right');
    const sliderFirstCard = slider.querySelector('.carousel-slider__item');
    const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
    const sliderListChildrens = [...sliderList.children];
    const cardPerView = firstCardWidth && Math.round(sliderList.offsetWidth / firstCardWidth);
    const totalSlides = sliderControls && sliderControls.querySelector('.carousel-slider__number-total');
    const shownSlides = sliderControls && sliderControls.querySelector('.carousel-slider__number-shown');
    let timeoutId = null;

    const autoPlay = () => {
      // timeoutId = setTimeout(() => {
      //   sliderList.scrollLeft += firstCardWidth : null;

      //   if (shownSlides && ((Number(shownSlides.textContent) + 1) > sliderListChildrens.length)) {
      //     shownSlides.textContent = 1;
      //   } else {
      //     shownSlides.textContent = Number(shownSlides.textContent) + 1;
      //   }
      // }, 4000);
    };

    const infiniteScroll = () => {
      if (sliderList.scrollLeft === 0) {
        sliderList.classList.add('carousel-slider__list--no-transition');
        sliderList.scrollLeft = sliderList.scrollWidth - (2 * sliderList.offsetWidth);
        sliderList.classList.remove('carousel-slider__list--no-transition');
      } else if (Math.ceil(sliderList.scrollLeft) === sliderList.scrollWidth - sliderList.offsetWidth) {
        sliderList.classList.add('carousel-slider__list--no-transition');
        sliderList.scrollLeft = sliderList.offsetWidth;
        sliderList.classList.remove('carousel-slider__list--no-transition');
      }

      clearTimeout(timeoutId);
      autoPlay();
    };

    totalSlides ? totalSlides.textContent = sliderListChildrens.length : null;

    sliderListChildrens.forEach((slide) => {
      slide.querySelector('button').setAttribute('tabindex', '-1');
    });

    if (sliderListChildrens && sliderListChildrens.length > 0) {
      if (sliderListChildrens.length < 3) {
        shownSlides ? shownSlides.textContent = sliderListChildrens.length : null;

        sliderButtonRight ? sliderButtonRight.disabled = true : null;
        sliderButtonLeft ? sliderButtonLeft.disabled = true : null;
      } else {
        sliderListChildrens.slice(-cardPerView).reverse().forEach(card => {
          sliderList.insertAdjacentHTML('afterbegin', card.outerHTML);
          card.classList.add('carousel-slider__item--original');
        });
    
        sliderListChildrens.slice(0, cardPerView).forEach(card => {
          sliderList.insertAdjacentHTML('beforeend', card.outerHTML);
          card.classList.add('carousel-slider__item--original');
        });

        const sliderListItems = sliderList && sliderList.querySelectorAll('.carousel-slider__item');
        const sliderListOriginalItems = sliderList && sliderList.querySelectorAll('.carousel-slider__item--original');
        console.log(sliderListOriginalItems);
        
        sliderListChildrens.forEach((slide, i) => {
          if (i < Math.round(sliderList.scrollLeft / (firstCardWidth + 20))) {
            slide.querySelector('button').setAttribute('tabindex', '0');
          } else {
            slide.querySelector('button').setAttribute('tabindex', '-1');
          }
        });

        autoPlay();

        sliderList.addEventListener('scroll', infiniteScroll);

        sliderList.addEventListener('keydown', (evt) => {
          if (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft') {
            evt.preventDefault();
          }
        });

        const clickTabHandler = (evt) => {
          if (evt.key == 'Tab') {
            evt.preventDefault();
          }
        };

        sliderList.addEventListener('touchmove', (evt) => {
          evt.preventDefault();
        });

        sliderButtonRight ? sliderButtonRight.addEventListener('click', () => {
          sliderButtonRight.disabled = true;
          sliderList.scrollLeft += firstCardWidth + 20;

          window.addEventListener('keydown', clickTabHandler);

          if (shownSlides && ((Number(shownSlides.textContent) + 1) > sliderListChildrens.length)) {
            shownSlides.textContent = 1;
          } else {
            shownSlides.textContent = Number(shownSlides.textContent) + 1;
          }

          setTimeout(() => {
            sliderListItems.forEach((slide, i) => {
              if (i === Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) || i > Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) && i < (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) + 3)) {
                slide.querySelector('button').setAttribute('tabindex', '0');
              } else {
                slide.querySelector('button').setAttribute('tabindex', '-1');
              }
            });

            if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === sliderListOriginalItems.length + 3) {
              sliderListItems.forEach((slide) => {
                slide.querySelector('button').setAttribute('tabindex', '-1');
              });

              sliderListOriginalItems.forEach((slide, i) => {
                if (i < 3) {
                  slide.querySelector('button').setAttribute('tabindex', '0');
                } else {
                  slide.querySelector('button').setAttribute('tabindex', '-1');
                }
              });
            }

            window.removeEventListener('keydown', clickTabHandler);
            sliderButtonRight.disabled = false;
            sliderButtonRight.focus();
          }, 400);
        }) : null;

        sliderButtonLeft ? sliderButtonLeft.addEventListener('click', () => {
          sliderButtonLeft.disabled = true;
          sliderList.scrollLeft -= firstCardWidth + 20;

          if (shownSlides && ((Number(shownSlides.textContent) - 1) < 1)) {
            shownSlides.textContent = sliderListChildrens.length;
          } else {
            shownSlides.textContent = Number(shownSlides.textContent) - 1;
          }

          window.addEventListener('keydown', clickTabHandler);

          setTimeout(() => {
            sliderListItems.forEach((slide, i, arr) => {
              if (i === Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) || i > Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) && i < (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) + 3)) {
                slide.querySelector('button').setAttribute('tabindex', '0');
              } else {
                slide.querySelector('button').setAttribute('tabindex', '-1');
              }
            });

            if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === 0) {
              sliderListItems.forEach((slide) => {
                slide.querySelector('button').setAttribute('tabindex', '-1');
              });

              sliderListOriginalItems.forEach((slide, i, arr) => {
                if (i < arr.length && i > arr.length - 4) {
                  slide.querySelector('button').setAttribute('tabindex', '0');
                } else {
                  slide.querySelector('button').setAttribute('tabindex', '-1');
                }
              });
            }

            window.removeEventListener('keydown', clickTabHandler);
            sliderButtonLeft.disabled = false;
            sliderButtonLeft.focus();
          }, 400);
        }) : null;
      }
    }
  });
};

export {initCarouselSlider};
