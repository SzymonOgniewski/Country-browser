import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const cList = document.querySelector('.country-list');
const result = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

const matchedCountry = ({ name, capital, population, flags, languages }) => {
  const countryFlag = document.createElement('div');
  const langParsed = languages.map(lang => lang.name).join(', ');
  countryFlag.classList.add('country-card');
  if (languages.map(language => language.name).length === 1) {
    countryFlag.innerHTML = `<span class="country-name"><img src="${flags.svg}" alt="${name} flag" width="50px"/><h2 class="country-card-name"> ${name} </h2></span> <h3 class="country-card-capital"> Capital: ${capital}</h3> <p class="country-card-lang">Language: ${langParsed}</p><p class="country-card-pop">Population: ${population}</p>`;
  } else {
    countryFlag.innerHTML = `<span class="country-name"><img src="${flags.svg}" alt="${name} flag" width="50px"/><h2> ${name} </h2></span> <h3> Capital: ${capital}</h3> <p>Languages: ${langParsed}</p><p>Population: ${population}</p>`;
  }
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
  debounce(
    event =>
      fetchCountries(event.target.value).then(countries =>
        console.log(countries)
      ),
    300
  )
);
