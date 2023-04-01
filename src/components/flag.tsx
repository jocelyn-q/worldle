import { Component } from 'react';
import CountryService from '../services/country';
import SubmitComponent from './submit';

import './flag.css';

interface FlagState {
  countries: Record<string, string>;
  countryCode: string;
  countryFlagUrl: string;
  displayName: boolean;
}

class FlagComponent extends Component<{}, FlagState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      countries: {},
      countryCode: 'fr',
      countryFlagUrl: '',
      displayName: false,
    };
  }

  // Load the country list once at the start of the app
  async componentDidMount() {
    const countryService = new CountryService();
    await countryService.getCountriesCode().then((data) => {
      this.setState({ countries: data });
    });

    this.setState({ countryFlagUrl: await this.getRandomUrl() });
  }

  async getRandomCountryCode(): Promise<string> {
    const randomCode = Object.keys(this.state.countries)[
      Math.floor(Math.random() * Object.keys(this.state.countries).length)
    ];

    this.setState({ countryCode: randomCode });
    return randomCode;
  }

  getCountryFlagUrl(code: string) {
    const countryFlagUrl = `https://flagcdn.com/${code}.svg`;
    console.log(countryFlagUrl);

    this.setState({ countryFlagUrl });
    return countryFlagUrl;
  }

  async getRandomUrl(): Promise<string> {
    const url = await this.getCountryFlagUrl(await this.getRandomCountryCode());
    return url;
  }

  async handleBtnClick() {
    this.setState({ countryFlagUrl: await this.getRandomUrl(), displayName: false });
  }

  render() {
    var { countryFlagUrl, countryCode, countries } = this.state;

    return (
      <div className="countryFlag">
        <img className="flag-img" src={countryFlagUrl} alt="flag" />
        <div className="btn-group">
          <button className="flag-btn" type="button" onClick={this.handleBtnClick.bind(this)}>
            Randomise Flag
          </button>
          <button
            className="country-name-btn"
            type="button"
            onClick={(event) => {
              this.setState({ displayName: !this.state.displayName });
            }}
          >
            Display Flag Name
          </button>
        </div>
        {this.state.displayName ? <span className="country-name">{countries[countryCode]}</span> : ''}
        <SubmitComponent countries={countries} countryCode={countryCode} isCorrectAnwser={false} />
      </div>
    );
  }
}

export default FlagComponent;
