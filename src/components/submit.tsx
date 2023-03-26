import React, { Component, useState } from 'react';

import './submit.css';

interface SubmitProps {
  countries: Record<string, string>;
  countryCode: string;
  isCorrectProp: boolean;
}

interface SubmitState {
  currentAnswer: string;
  isCorrect: boolean;
}

class SubmitComponent extends Component<SubmitProps, SubmitState> {
  constructor(props: SubmitProps) {
    super(props);
    this.state = {
      currentAnswer: '',
      isCorrect: false,
    };
  }

  componentWillReceiveProps(props: SubmitProps) {
    this.setState({ isCorrect: props.isCorrectProp });
  }

  isCorrectAnwser(currentAnswer: string) {
    const isCorrect = currentAnswer.toLowerCase() === this.props.countries[this.props.countryCode].toLowerCase();

    return isCorrect;
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const currentAnswer = this.state.currentAnswer;

    if (event.key === 'Enter') {
      event.preventDefault();

      this.setState({ isCorrect: this.isCorrectAnwser(currentAnswer) });
    }
  }

  render() {
    const { countries, countryCode } = this.props;

    return (
      <div>
        <form>
          <input
            className={`input-text ${this.state.isCorrect ? 'correct' : 'wrong'}`}
            type="text"
            onChange={(event) => this.setState({ currentAnswer: event.target.value })}
            onKeyDown={this.handleKeyDown.bind(this)}
          ></input>
        </form>
        {this.state.isCorrect ? <span className="win-text">Correct Answer, well done !</span> : ''}
      </div>
    );
  }
}

export default SubmitComponent;
