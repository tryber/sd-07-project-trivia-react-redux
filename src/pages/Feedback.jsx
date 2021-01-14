import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { scoreboard } = this.props;
    const badMessage = 'Podia ser melhor...';
    const goodMessage = 'Mandou bem!';
    const mediumScore = 30;

    return (
      <div>
        <Header />
        <h3
          data-testid="feedback-text"
        >
          {scoreboard < mediumScore ? badMessage : goodMessage}
        </h3>
        <h4 data-testid="feedback-total-score">{`Placar Final: ${scoreboard}`}</h4>
        <h4
          data-testid="feedback-total-question"
        >
          {`Você acertou ${answers} pergunta(s)`}
        </h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreboard: state.login.scoreboard,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  scoreboard: PropTypes.number.isRequired,
};
