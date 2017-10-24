export const isElementInViewport = (el, viewPortHeight) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top < viewPortHeight &&
    rect.bottom > 0
  );
};

/**
 *                (clientRectTop - viewPortHeight) * (start - end)
 *    start  +  -----------------------------------------------------
 *                         viewPortHeight - 70
 */

export const getViewPortWidth = () => window.innerWidth || document.documentElement.clientWidth;

export const getViewPortHeight = () => window.innerHeight || document.documentElement.clientHeight;

const start = 100;
const end = 65;

const mapElementTopToImageBackgroundPosition = (clientRectTop, viewPortHeight) =>
  start + (((clientRectTop - viewPortHeight) * (start - end)) / (viewPortHeight - 70));

const parallaxHandler = parallaxElement => {
  parallaxElement.style.backgroundPositionY =
    mapElementTopToImageBackgroundPosition(parallaxElement.getBoundingClientRect().top, getViewPortHeight()) + 'px';
};

export const getScrollHandlerForParallax = () => {
  let parallaxHandlerAdded = false;
  const parallaxElement = document.getElementsByClassName('volunteer-parallax')[0];
  const boundParallaxHandler = parallaxHandler.bind(null, parallaxElement);
  return () => {
    if (isElementInViewport(parallaxElement, getViewPortHeight()) && !parallaxHandlerAdded) {
      console.log('Parallax in view. Attaching handler.');
      window.addEventListener('scroll', boundParallaxHandler);
      parallaxHandlerAdded = true;
    } else if (!isElementInViewport(parallaxElement, getViewPortHeight()) && parallaxHandlerAdded) {
      console.log('Parallax out of view. Removing handler.');
      window.removeEventListener('scroll', boundParallaxHandler);
      parallaxHandlerAdded = false;
    }
  };
};
