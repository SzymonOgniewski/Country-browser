const input = document.querySelector('#search-box');

const getUrl = name =>
  `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

const fetchCountries = name =>
  fetch(getUrl(name))
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);
fetchCountries('USA');
