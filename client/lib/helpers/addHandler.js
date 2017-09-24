const addHandler = (obj, eventType, handler) => {
  if (obj[eventType]) {
    let oldHandler = obj[eventType];
    obj[eventType] = e => {
      oldHandler(e);
      handler(e);
    };
  } else {
    obj[eventType] = handler;
  }
};

export default addHandler;
