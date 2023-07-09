import React, { Component } from 'react';
import Select from 'react-select';

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
    this.setState({
      isCorrectAnwser: props.isCorrectAnwser,
      currentAnswer: '',
    });
  }

  isCorrectAnwser(currentAnswer: string) {
    const isCorrect = currentAnswer.toLowerCase() === this.props.countries[this.props.countryCode].toLowerCase();

    return isCorrect;
  }

  render() {
    var { currentAnswer } = this.state;
    console.log(this.props.countries);
    console.log(this.props.countryCode);

    return (
      <div>
        <form>
          <Select
            className={`selector ${this.state.isCorrectAnwser ? 'correct' : 'wrong'}`}
            placeholder="Country, state..."
            isClearable={true}
            isSearchable={true}
            onChange={(selectedOption) => {
              if (selectedOption) {
                console.log(selectedOption);
                this.setState({ currentAnswer: selectedOption?.label });
                this.setState({
                  isCorrectAnwser: this.isCorrectAnwser(selectedOption?.label),
                });
              }
            }}
            options={Object.entries(this.props.countries).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
          />
        </form>
        {this.state.isCorrectAnwser ? <span className="win-text">Correct Answer, well done !</span> : ''}
      </div>
    );
  }
}

export default SubmitComponent;
