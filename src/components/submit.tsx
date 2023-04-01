import React, { Component } from 'react';

import './submit.css';

interface SubmitProps {
  countries: Record<string, string>;
  countryCode: string;
  isCorrectAnwser: boolean;
}

interface SubmitState {
  currentAnswer: string;
  isCorrectAnwser: boolean;
}

class SubmitComponent extends Component<SubmitProps, SubmitState> {
  constructor(props: SubmitProps) {
    super(props);
    this.state = {
      currentAnswer: '',
      isCorrectAnwser: false,
    };
  }

  componentWillReceiveProps(props: SubmitProps) {
    this.setState({ isCorrectAnwser: props.isCorrectAnwser, currentAnswer: '' });
  }

  isCorrectAnwser(currentAnswer: string) {
    const isCorrect = currentAnswer.toLowerCase() === this.props.countries[this.props.countryCode].toLowerCase();

    return isCorrect;
  }

  handleSubmitAnswer(event: React.KeyboardEvent<HTMLInputElement>) {
    const currentAnswer = this.state.currentAnswer;

    if (event.key === 'Enter') {
      event.preventDefault();

      this.setState({ isCorrectAnwser: this.isCorrectAnwser(currentAnswer) });
    }
  }

  render() {
    var { currentAnswer } = this.state;
    return (
      <div>
        <form>
          <input
            className={`input-text ${this.state.isCorrectAnwser ? 'correct' : 'wrong'}`}
            type="text"
            placeholder="Country, state..."
            value={currentAnswer}
            onChange={(event) => this.setState({ currentAnswer: event.target.value })}
            onKeyDown={this.handleSubmitAnswer.bind(this)}
          ></input>
        </form>
        {this.state.isCorrectAnwser ? <span className="win-text">Correct Answer, well done !</span> : ''}
      </div>
    );
  }
}

export default SubmitComponent;
