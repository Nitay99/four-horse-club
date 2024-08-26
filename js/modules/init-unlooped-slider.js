const initUnloopedSlider = () => {
  const slider = document.querySelector('.unlooped-slider');
  const sliderList = slider && slider.querySelector('.unlooped-slider__list');

  if (!slider && !sliderList) {
    return;
  }

  const sliderButtonRight = slider.querySelector('.unlooped-slider__btn--right');
  const sliderButtonLeft = slider.querySelector('.unlooped-slider__btn--left');
  const sliderFirstCard = sliderList.querySelector('.unlooped-slider__item');
  const sliderListItems = sliderList.querySelectorAll('.unlooped-slider__item');
  const paginationList = slider.querySelector('.unlooped-slider__pagination-list');

  const createPaginationItem = () => {
    const paginationItem = document.createElement('li');
    paginationItem.classList.add('unlooped-slider__pagination-item');
    const paginationSpan = document.createElement('span');
    paginationItem.appendChild(paginationSpan);

    paginationList && paginationList.appendChild(paginationItem);
  };

  if (sliderListItems && sliderListItems.length > 0) {
    sliderListItems.forEach(() => {
      createPaginationItem();
    });
  }

  const paginationListItems = paginationList.querySelectorAll('.unlooped-slider__pagination-item');

  paginationListItems.forEach((item, i) => {
    const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;

    if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === i) {
      item.classList.add('unlooped-slider__pagination-item--active');
    }
  });

  if (sliderList.scrollLeft === 0) {
    sliderButtonLeft.disabled = true;
  }

  paginationListItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;

      sliderList.scrollLeft = (firstCardWidth + 20) * i;
    });
  });

  sliderList.addEventListener('scroll', () => {
    if ((Math.ceil(sliderList.scrollLeft) === sliderList.scrollWidth - sliderList.offsetWidth) || (Math.ceil(sliderList.scrollLeft) - 1 === sliderList.scrollWidth - sliderList.offsetWidth) || (Math.ceil(sliderList.scrollLeft) === sliderList.scrollWidth - sliderList.offsetWidth - 1)) {
      sliderButtonRight.disabled = true;
    } else {
      sliderButtonRight.disabled ? sliderButtonRight.disabled = false : null;
    }

    if (sliderList.scrollLeft === 0) {
      sliderButtonLeft.disabled = true;
    } else {
      sliderButtonLeft.disabled ? sliderButtonLeft.disabled = false : null;
    }

    paginationListItems.forEach((item, i) => {
      const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;

      if (Math.round(sliderList.scrollLeft / (firstCardWidth + 20)) === i) {
        item.classList.add('unlooped-slider__pagination-item--active');
      } else if (item.classList.contains('unlooped-slider__pagination-item--active')) {
        item.classList.remove('unlooped-slider__pagination-item--active');
      }
    });
  });

  sliderButtonRight && sliderButtonRight.addEventListener('click', () => {
    const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
    sliderList.scrollLeft += firstCardWidth + 20;
  });

  sliderButtonLeft && sliderButtonLeft.addEventListener('click', () => {
    const firstCardWidth = sliderFirstCard && sliderFirstCard.offsetWidth;
    sliderList.scrollLeft -= firstCardWidth + 20;
  });
};

export {initUnloopedSlider};