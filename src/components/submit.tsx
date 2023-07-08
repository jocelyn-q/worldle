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
    const isCorrect =
      currentAnswer.toLowerCase() ===
      this.props.countries[this.props.countryCode].toLowerCase();

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
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];
    console.log(this.props.countries);
    console.log(this.props.countryCode);

    return (
      <div>
        <form>
          <input
            className={`input-text ${
              this.state.isCorrectAnwser ? 'correct' : 'wrong'
            }`}
            type="text"
            placeholder="Country, state..."
            value={currentAnswer}
            onChange={(event) =>
              this.setState({ currentAnswer: event.target.value })
            }
            onKeyDown={this.handleSubmitAnswer.bind(this)}
          ></input>
          <Select
            className={`selector ${
              this.state.isCorrectAnwser ? 'correct' : 'wrong'
            }`}
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
            options={Object.entries(this.props.countries).map(
              ([key, value]) => ({
                value: key,
                label: value,
              })
            )}
          />
        </form>
        {this.state.isCorrectAnwser ? (
          <span className="win-text">Correct Answer, well done !</span>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default SubmitComponent;
