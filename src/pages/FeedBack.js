import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CustomHeader, CustomPlayAgain } from "../components";

class FeedBack extends Component {
  constructor() {
    super();
    this.goRanking = this.goRanking.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    const { history } = this.props;
    history.push("/");
  }

  goRanking() {
    const { history } = this.props;
    history.push("/ranking");
  }

  render() {
    const { name, email, score, assertions } = this.props;
    return (
      <div>
        <CustomHeader name={ name } email={ email } score={ score } />
        <h1 data-testid="feedback-text">FeedBack</h1>
        {assertions < 3 ? (
          <h2 data-testid="feedback-text">Podia ser melhor...</h2>
        ) : (
          <h2 data-testid="feedback-text">Mandou bem!</h2>
        )}
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <h3 data-testid="feedback-total-question">{ assertions }</h3>
        <CustomPlayAgain goHome={this.goHome} />
        <button data-testid="btn-ranking" onClick={ this.goRanking }>
          Rankinggg!!!!!!
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { name, email },
  playerReducer: { score, assertions },
}) => ({
  name,
  email,
  score,
  assertions,
});

export default connect(mapStateToProps)(FeedBack);

FeedBack.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
