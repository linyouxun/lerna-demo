export const on = (function () {
  if (!document.addEventListener) {
    return function (element, event, handle) {
      element.activeElement("on" + event, handle);
    };
  }
  return function (element, event, handle) {
    element.addEventListener(event, handle);
  };
})();
export const off = (function () {
  if (!document.addEventListener) {
    return function (element, event, handle) {
      element.detachEvent("on" + event, handle);
    };
  }
  return function (element, event, handle) {
    element.removeEventListener(event, handle);
  };
})();

export const once = (function () {
  return function (element, event, handle) {
    function listener() {
      handle.apply(this, arguments);
      off(element, event, listener);
    }
    on(element, event, listener);
  };
})();
