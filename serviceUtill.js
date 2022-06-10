import fruits from './suggestions.js';

export async function fetchSuggestions(query) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getFruites(query));
    }, 500);
  });
  return promise;
}

function getFruites(str) {
  return fruits.filter((fruit) => {
    return fruit.indexOf(str) > -1;
  });
}

export function debounce(fn, wait) {
  let timer;
  return function () {
    const arg = arguments;
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, arg);
    }, wait);
  };
}

export function throttle(fn, wait) {
  let throttleStarted = false;
  let timer;
  return function () {
    const context = this,
      arg = arguments;
    if (!throttleStarted) {
      fn.apply(context, arg);
      throttleStarted = true;
      timer = setTimeout(() => (throttleStarted = false), wait);
    }
  };
}

export function promiseAll(promises) {
  let output = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, idx) => {
      promise
        .then((value) => {
          output[idx] = value;
          if (output.length === promises.length) {
            resolve(output);
          }
        })
        .catch(reject);
    });
  });
}
