import { useEffect, useState } from 'react';
import countriesJson from '../data/countries.json';
import Submit from './submit';

import './flag.css';

function Flag() {
  const [countries, setCountries] = useState<{ [key: string]: string }>(countriesJson);
  const [countryCode, setCountryCode] = useState('');
  const [countryFlagUrl, setCountryFlagUrl] = useState('');
  const [displayName, setDisplayName] = useState(false);
  const [winStreak, setWinStreak] = useState(0);

  useEffect(() => {
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

  const increaseWinStreak = () => {
    setWinStreak((streak) => streak + 1);
  };

  return (
    <div className="countryFlag">
      <div className="flag">
        <img className="flag-img" src={countryFlagUrl} alt="flag" />
      </div>
      <span className="country-name">{displayName ? countries[countryCode] : ''}</span>
      <div className="btn-group">
        <button className="btn clickable green" type="button" onClick={handleRandomiseClick}>
          Randomise
        </button>
        <button className="btn clickable blue" type="button" onClick={handleDisplayName}>
          Display Name
        </button>
        <button className="btn grey" type="button">
          Win Streak : {winStreak}
        </button>
      </div>
      <Submit key={countryCode} countries={countries} countryCode={countryCode} increaseWinStreak={increaseWinStreak} />
    </div>
  );
}

export default Flag;
