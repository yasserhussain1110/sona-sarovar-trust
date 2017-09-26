export const removeHandler = (obj, eventType, handlerName) => {
  if (obj && obj[eventType]) {
    obj[eventType].handlerObjs = obj[eventType].handlerObjs.filter(hObj => hObj.name !== handlerName);
  }
};

export const addHandler = (obj, eventType, handlerObj) => {
  if (obj[eventType] && obj[eventType].handlerObjs) {
    obj[eventType].handlerObjs.push(handlerObj);
  } else {
    function dispatch(e) {
      dispatch.handlerObjs.forEach(h => h.func(e))
    }

    obj[eventType] = dispatch;
    dispatch.handlerObjs = [handlerObj];
  }
};

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

const start = 195;
const end = 65;

const mapElementTopToImageBackgroundPosition = (clientRectTop, viewPortHeight) =>
start + (((clientRectTop - viewPortHeight) * (start - end)) / (viewPortHeight - 70));

export const getScrollHandlerForParallax = () => {
  let parallaxHandlerAdded = false;
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight;
  const parallaxElement = document.getElementsByClassName('volunteer-parallax')[0];
  return () => {
    if (isElementInViewport(parallaxElement, viewPortHeight) && !parallaxHandlerAdded) {
      console.log("Parallax in view. Attaching handler");
      addHandler(window, 'onscroll', {
        name: 'parallaxHandler',
        func: () => {
          parallaxElement.style.backgroundPositionY =
            mapElementTopToImageBackgroundPosition(parallaxElement.getBoundingClientRect().top, viewPortHeight) + 'px';
        }
      });
      parallaxHandlerAdded = true;
    } else if (!isElementInViewport(parallaxElement, viewPortHeight) && parallaxHandlerAdded) {
      console.log("Parallax out of view. Removing handler");
      removeHandler(window, 'onscroll', 'parallaxHandler');
      parallaxHandlerAdded = false;
    }
  }
};
