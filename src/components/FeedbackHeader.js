import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameScore from './GameScore';

class FeedbackHeader extends React.Component {
  render() {
    const { name, hash, assertions } = this.props;
    const src = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="" src={ src } />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ assertions }</span>
        <GameScore />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.game.hash,
  name: state.login.name,
  assertions: state.game.assertions,
});

FeedbackHeader.propTypes = {
  hash: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedbackHeader);
