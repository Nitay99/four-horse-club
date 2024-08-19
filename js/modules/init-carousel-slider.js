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

    if (sliderListChildrens && sliderListChildrens.length > 0) {
      totalSlides ? totalSlides.textContent = sliderListChildrens.length : null;

      sliderListChildrens.forEach((slide) => {
        slide.querySelector('button').setAttribute('tabindex', '-1');
      });

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
        
        sliderListChildrens.forEach((slide, i) => {
          if (i < Math.round(sliderList.scrollLeft / (firstCardWidth + 20))) {
            slide.querySelector('button').setAttribute('tabindex', '0');
          } else {
            slide.querySelector('button').setAttribute('tabindex', '-1');
          }
        });

        const clickTabHandler = (evt) => {
          if (evt.key == 'Tab') {
            evt.preventDefault();
          }
        };

        const autoPlay = () => {
          timeoutId = setTimeout(() => {
            slider.addEventListener('keydown', clickTabHandler);
            sliderButtonLeft.classList.add('btn-arrow--not-active');
            sliderButtonLeft.disabled = true;
            const sliderFirstCard = slider.querySelector('.carousel-slider__item');
            const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
            sliderList.scrollLeft += firstCardWidth;
    
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

              slider.removeEventListener('keydown', clickTabHandler);
              sliderButtonLeft.disabled = false;
              sliderButtonLeft.classList.remove('btn-arrow--not-active');
            }, 400);
          }, 4000);
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
          
          if (slider.parentElement.getBoundingClientRect().top < 250) {
            autoPlay();
          }
        };

        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            clearTimeout(timeoutId);
          } else if (slider.parentElement.getBoundingClientRect().top < 250) {
            autoPlay();
          }
        });

        let byScrollAutoPlayInit = null;

        document.addEventListener('scroll', () => {
          if (slider.parentElement.getBoundingClientRect().top < 250 && byScrollAutoPlayInit !== true) {
            clearTimeout(timeoutId);
            autoPlay();
            byScrollAutoPlayInit = true;
          } else if (byScrollAutoPlayInit === true && slider.parentElement.getBoundingClientRect().top > 250) {
            clearTimeout(timeoutId);
            byScrollAutoPlayInit = false;
          }
        });

        sliderList.addEventListener('scroll', infiniteScroll);

        sliderList.addEventListener('keydown', (evt) => {
          if (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft') {
            evt.preventDefault();
          }
        });

        sliderList.addEventListener('touchmove', (evt) => {
          evt.preventDefault();
        });

        sliderButtonRight ? sliderButtonRight.addEventListener('click', () => {
          window.addEventListener('keydown', clickTabHandler);
          sliderButtonRight.disabled = true;
          const sliderFirstCard = slider.querySelector('.carousel-slider__item');
          const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
          sliderList.scrollLeft += firstCardWidth + 20;

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

            window.removeEventListener('keydown', clickTabHandler);
            sliderButtonRight.disabled = false;
            sliderButtonRight.focus();
          }, 400);
        }) : null;

        sliderButtonLeft ? sliderButtonLeft.addEventListener('click', () => {
          sliderButtonLeft.disabled = true;
          const sliderFirstCard = slider.querySelector('.carousel-slider__item');
          const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
          sliderList.scrollLeft -= firstCardWidth + 20;

          if (shownSlides && ((Number(shownSlides.textContent) - 1) < 1)) {
            shownSlides.textContent = sliderListChildrens.length;
          } else {
            shownSlides.textContent = Number(shownSlides.textContent) - 1;
          }

          window.addEventListener('keydown', clickTabHandler);

          setTimeout(() => {
            sliderListItems.forEach((slide, i) => {
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

              sliderListChildrens.forEach((slide, i, arr) => {
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
