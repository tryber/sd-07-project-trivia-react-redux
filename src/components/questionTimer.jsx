import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 30,
    };
    this.timeQuestion = this.timeQuestion.bind(this);
  }

  componentDidMount() {
    const interval = 1000;
    this.intervalSeconds = setInterval(this.timeQuestion, interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalSeconds);
  }

  timeQuestion() {
    const { disableButton } = this.props;
    const { counter } = this.state;
    if (counter < 1) {
      clearInterval(this.intervalSeconds);
      disableButton(true);
    } else {
      this.setState({
        counter: counter - 1,
      });
    }
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <p>
          Tempo:
          { counter }
        </p>
      </div>
    );
  }
}

QuestionTimer.propTypes = {
  disableButton: PropTypes.func.isRequired,
};

export default QuestionTimer;
