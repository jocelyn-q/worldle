import React, { Component, useEffect } from "react";
import CountryService from "../services/country";
import SubmitComponent from "./submit";

import "./flag.css";

interface FlagProps {
  countries: Record<string, string>;
  countryCode: string;
  countryFlagUrl: string;
}

class FlagComponent extends Component<{}, FlagProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      countries: {},
      countryCode: "fr",
      countryFlagUrl: "",
    };
  }

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

  render() {
    var { countryFlagUrl, countryCode, countries } = this.state;

    const handleClick = async () => {
      countryFlagUrl = await this.getRandomUrl();
      console.log(countryFlagUrl);
    };

    return (
      <div className="countryFlag">
        <button className="flag-btn" type="button" onClick={handleClick}>
          Randomise Flag
        </button>
        <img className="flag-img" src={countryFlagUrl} alt="flag" />;
        <SubmitComponent countries={countries} countryCode={countryCode} />
      </div>
    );
  }
}

export default FlagComponent;
