import React, { Component } from "react";

class CountryService {
  async getCountryByName(name: string) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await response.json();
    return data;
  }

  async getCountriesCode() {
    const response = await fetch(`https://flagcdn.com/en/codes.json`);
    const data = await response.json();
    return data;
  }
}

export default CountryService;
