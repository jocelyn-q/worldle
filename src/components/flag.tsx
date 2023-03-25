import React, { Component } from "react";
import CountryService from "../services/country";

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
    const { countryCode } = this.state;

    await this.getCountryFlagUrl(await this.getRandomCountryCode());
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
  }

  render() {
    const { countryFlagUrl } = this.state;
    return (
      <div className="countryFlag">
        <img
          src={countryFlagUrl}
          height="35%"
          width="35%"
          max-height="35%"
          max-width="35%"
          alt="flag"
        />
        ;
      </div>
    );
  }
}

export default MyComponent;
