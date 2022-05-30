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
      fn.apply(this, arg);
    }, wait);
  };
}
