import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Notification } from '../Notification/Notification';
import { Section } from '../Section/Section';
import { Statiscics } from 'components/Statistics/Statisctics';
import { Wrapper } from './Feedback.styled';

const { Component } = require('react');
// refactor here
class Feedback extends Component {
  state = {
    good: 0,
    bad: 0,
    neutral: 0,
  };
  handleIncrement = name => {
    this.setState(prevState => ({
      [name]: prevState[name] + 1,
    }));
  };
  calculateTotal = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };
  calculatePercentage = () => {
    return this.calculateTotal() === 0
      ? `No data`
      : `${Math.round((this.state.good / this.calculateTotal()) * 100)}%`;
  };
  render() {
    const options = Object.keys(this.state);
    return (
      <Wrapper>
        <Section title="Feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleIncrement}
          />
        </Section>

        <Section title="Statistics">
          {this.calculateTotal() === 0 ? (
            <Notification message="Please enter feedback" />
          ) : (
            <Statiscics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.calculateTotal()}
              positivePercentage={this.calculatePercentage()}
            />
          )}
        </Section>
      </Wrapper>
    );
  }
}

export default Feedback;
