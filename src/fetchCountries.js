import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
const input = document.querySelector('#search-box');
const result = document.querySelector('.country-info');
const cList = document.querySelector('.country-list');
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

const getUrl = name =>
  `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

const fetchCountries = name => {
  const parsedName = name.trim();
  if (name.length === 0) return;
  const url = getUrl(parsedName);
  return fetch(getUrl(name))
    .then(res => {
      if (!res.ok) {
        Notiflix.Notify.failure(`Can not find a country with name of ${name}`);
      }
      return res.json();
    })
    .then(data => {
      return data;
    })
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        result = '';
      }
      if (countries.length === 1) {
        return matchedCountry(countries[0]);
      }
      return countriesList(countries);
    })
    .catch(error => {
      result.innerHTML = '';
      return;
    });
};

input.addEventListener(
  'input',
  debounce(event => fetchCountries(event.target.value), 300)
);
