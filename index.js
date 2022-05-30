// Import stylesheets
import './style.css';
import { fetchSuggestions, debounce, throttle } from './serviceUtill.js';
// Write Javascript code!
function autoCompleteTextbox(formID) {
  this.form = document.querySelector(formID);
  this.inputBox = this.form.querySelector('input');
  this.suggestions = this.form.querySelector('#suggestions');
}

autoCompleteTextbox.prototype.bindEventListners = function bindEventListners() {
  this.form.addEventListener('onsubmit', (e) => {
    e.preventDefault();
  });

  this.inputBox.addEventListener(
    'input',
    debounce(handleChangeEvent.bind(this), 500)
  );
};

autoCompleteTextbox.prototype.getSuggestions = async function getSuggestions(
  value
) {
  const suggestions = await fetchSuggestions(value);
  this.buildSuggestionList(suggestions);
};

autoCompleteTextbox.prototype.buildSuggestionList =
  function buildSuggestionList(list) {
    const listEl = list.map((el) => {
      return `<li>${el}</li>`;
    });
    this.suggestions.innerHTML = `<ul>${listEl.join('')}</ul>`;
  };

const autoComplteObj = new autoCompleteTextbox('#searchForm');
autoComplteObj.bindEventListners();

function handleChangeEvent(value) {
  console.log(value.target.value, new Date());
  this.getSuggestions(value.target.value);
}
