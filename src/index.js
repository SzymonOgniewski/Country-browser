import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const cList = document.querySelector('.country-list');
const result = document.querySelector('.country-info');
const input = document.querySelector('#search-box');
const lang = document.getElementsByClassName('country-card-lang');
const currentCapital = document.getElementsByClassName('country-card-capital');

const matchedCountry = ({ name, capital, population, flags, languages }) => {
  const countryFlag = document.createElement('div');
  const langParsed = languages.map(lang => lang.name).join(', ');

  countryFlag.classList.add('country-card');
  countryFlag.innerHTML = `<span class="country-name"><img src="${
    flags.svg
  }" alt="${name} flag" width="50px"/><h2 class="country-card-name"> ${name} </h2></span> <h3 class="country-card-capital">${
    capital === undefined
      ? (currentCapital.textContent = ``)
      : (currentCapital.textContent = `Capital: ${capital}`)
  }</h3> <p class="country-card-lang">Language${
    languages.length === 1 ? '' : 's'
  }: ${langParsed}</p><p class="country-card-pop">Population: ${population}</p>`;
  result.innerHTML = '';
  cList.innerHTML = '';
  result.append(countryFlag);
};

const countriesList = countries => {
  const listItem = countries.map(({ flags, name }) => {
    const item = document.createElement('li');
    item.innerHTML = `<img src="${flags.svg}" alt="${name} flag" width="50px"/> <h3>${name}</h3> `;
    item.classList.add('list-item');
    return item;
  });
  result.innerHTML = '';
  cList.innerHTML = '';
  cList.append(...listItem);
};

input.addEventListener(
  'input',
  debounce(event => {
    const regex = /[\[\]!@#$%^&*()/|"'`?><0-9_+~\\;:{}]/;
    if (event.target.value.match(regex)) {
      return Notiflix.Notify.warning(
        'Try using letters or dashes for searching countries. '
      );
    }
    fetchCountries(event.target.value).then(countries => {
      if (countries.length > 1 && countries.length <= 10) {
        countriesList(countries);
      }
      if (countries.length === 1) {
        matchedCountry(countries[0]);
      }
      if (countries.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    });
    console.clear();
  }, DEBOUNCE_DELAY)
);
