import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Notification } from '../Notification/Notification';
import { Section } from '../Section/Section';
import { Statiscics } from 'components/Statistics/Statisctics';
import { Wrapper } from './Feedback.styled';

const { useState } = require('react');

export const Feedback = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const options = ['good', 'bad', 'neutral'];

  const handleIncrement = name => {
    switch (name) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      default:
        console.error(`Something went wrong, try again.`);
        break;
    }
  };
  const calculateTotal = () => {
    return good + neutral + bad;
  };
  const calculatePercentage = () => {
    return calculateTotal() === 0
      ? `No data`
      : `${Math.round((good / calculateTotal()) * 100)}%`;
  };

  return (
    <Wrapper>
      <Section title="Feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleIncrement} />
      </Section>

      <Section title="Statistics">
        {calculateTotal() === 0 ? (
          <Notification message="Please enter feedback" />
        ) : (
          <Statiscics
            good={good}
            neutral={neutral}
            bad={bad}
            total={calculateTotal()}
            positivePercentage={calculatePercentage()}
          />
        )}
      </Section>
    </Wrapper>
  );
};

export default Feedback;
