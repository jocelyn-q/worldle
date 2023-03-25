import React, { Component } from "react";

import "./submit.css";

interface SubmitProps {
  countries: Record<string, string>;
  countryCode: string;
}

class SubmitComponent extends Component<SubmitProps> {
  render() {
    const { countries, countryCode } = this.props;

    return (
      <div>
        <span className="country-name">{countries[countryCode]}</span>
        <form>
          <input className="input-text" type="text"></input>
        </form>
      </div>
    );
  }
}

export default SubmitComponent;
