import React, { Component } from "react";
import CountryService from "../services/country";

interface MyComponentProps {
  countryFlagUrl: string;
}

class MyComponent extends Component<{}, MyComponentProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      countryFlagUrl: "",
    };
  }

  async componentDidMount() {
    await this.getCountryFlag();
  }

  async getCountryFlag() {
    const countryService = new CountryService();
    const countryCodes = await countryService.getCountriesCode();

    const randomCode =
      Object.keys(countryCodes)[
        Math.floor(Math.random() * Object.keys(countryCodes).length)
      ];

    const countryFlagUrl = `https://flagcdn.com/${randomCode}.svg`;
    console.log(countryFlagUrl);

    this.setState({ countryFlagUrl });
  }

  render() {
    const { countryFlagUrl } = this.state;
    return (
      <div className="countryFlag">
        <img src={countryFlagUrl} height="35%" width="35%" alt="flag" />;
      </div>
    );
  }
}

export default MyComponent;
