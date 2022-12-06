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

export default fetchCountries;
