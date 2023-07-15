import React, { useState } from 'react';
import Select from 'react-select';

import './submit.css';

type SubmitProps = {
  countries: { [key: string]: string };
  countryCode: string;
  increaseWinStreak: any;
};

function Submit({ countries, countryCode, increaseWinStreak }: SubmitProps) {
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  function checkAnswer(answer: string) {
    const isCorrect = answer.toLowerCase() === countries[countryCode].toLowerCase();
    if (isCorrect) increaseWinStreak();
    setIsCorrectAnswer(isCorrect);
  }

  function handleSelectChange(selectedOption: any) {
    if (selectedOption) {
      setCurrentAnswer(selectedOption.label);
      checkAnswer(selectedOption.label);
      return;
    }
    setCurrentAnswer('');
    setIsCorrectAnswer(false);
  }

  return (
    <div>
      <form>
        <Select
          className={`selector ${isCorrectAnswer ? 'correct' : 'wrong'}`}
          placeholder="Country, state..."
          isClearable={true}
          isSearchable={true}
          onChange={handleSelectChange}
          options={Object.entries(countries).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        />
      </form>
      {currentAnswer !== '' ? (
        isCorrectAnswer ? (
          <span className="win-text">Correct Answer, well done!</span>
        ) : (
          <span className="win-text">Try again!</span>
        )
      ) : null}
    </div>
  );
}

export default React.memo(Submit);
