import { useEffect, useState } from 'react';
import CountryService from '../services/country';
import Submit from './submit';

import './flag.css';

function Flag() {
  const [countries, setCountries] = useState<{ [key: string]: string }>({});
  const [countryCode, setCountryCode] = useState('fr');
  const [countryFlagUrl, setCountryFlagUrl] = useState('');
  const [displayName, setDisplayName] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const countryService = new CountryService();
      const data = await countryService.getCountriesCode();
      setCountries(data);
    };

    fetchData();
    setCountryFlagUrl(getRandomUrl());
  }, []);

  function getRandomCountryCode(): string {
    if (countries === undefined) return 'fr';

    const randomCode = Object.keys(countries)[Math.floor(Math.random() * Object.keys(countries).length)];

    setCountryCode(randomCode);
    return randomCode;
  }

  function getCountryFlagUrl(code: string) {
    if (code === undefined) code = 'fr';

    const countryFlagUrl = `https://flagcdn.com/${code}.svg`;
    console.log(countryFlagUrl);

    setCountryFlagUrl(countryFlagUrl);
    return countryFlagUrl;
  }

  function getRandomUrl(): string {
    const url = getCountryFlagUrl(getRandomCountryCode());
    return url;
  }

  function handleRandomiseClick() {
    setCountryFlagUrl(getRandomUrl());
    setDisplayName(false);
  }

  function handleDisplayName() {
    setDisplayName(!displayName);
  }

  return (
    <div className="countryFlag">
      <div className="flag">
        <img className="flag-img" src={countryFlagUrl} alt="flag" />
      </div>
      <span className="country-name">{displayName ? countries[countryCode] : ''}</span>
      <div className="btn-group">
        <button className="btn green" type="button" onClick={handleRandomiseClick}>
          Randomise
        </button>
        <button className="btn blue" type="button" onClick={handleDisplayName}>
          Display Name
        </button>
      </div>
      <Submit key={countryCode} countries={countries} countryCode={countryCode} />
    </div>
  );
}

export default Flag;
