import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';

class Game extends React.Component {
  render() {
    const { wins } = this.props;
    let message = 'Podia ser melhor...';
    const three = 3;
    if (wins >= three) {
      message = 'Mandou bem!';
    }
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{message}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wins: state.trivia.wins,
});

Game.propTypes = {
  wins: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
