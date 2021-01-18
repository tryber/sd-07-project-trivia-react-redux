import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameScore extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        { score }
      </div>);
  }
}

const mapStateToProps = (state) => ({
  score: state.game.score,
});

GameScore.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameScore);
