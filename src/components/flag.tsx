import React, { Component } from "react";
import CountryService from "../services/country";
import "./flag.css";

interface MyComponentProps {
  countryCode: string;
  countryFlagUrl: string;
}

class MyComponent extends Component<{}, MyComponentProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      countryCode: "fr",
      countryFlagUrl: "",
    };
  }

  async componentDidMount() {
    this.setState({ countryFlagUrl: await this.getRandomUrl() });
  }

  async getRandomCountryCode(): Promise<string> {
    const countryService = new CountryService();
    const countryCodes = await countryService.getCountriesCode();

    const randomCode =
      Object.keys(countryCodes)[
        Math.floor(Math.random() * Object.keys(countryCodes).length)
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
    var { countryFlagUrl } = this.state;
    const handleClick = async () => {
      // implementation details
      countryFlagUrl = await this.getRandomUrl();
      console.log(countryFlagUrl);
    };

    return (
      <div className="countryFlag">
        <button className="flag-btn" type="button" onClick={handleClick}>
          Randomise Flag
        </button>
        <img className="flag-img" src={countryFlagUrl} alt="flag" />;
      </div>
    );
  }
}

export default MyComponent;
