import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    /* const { token } = this.props; */
    return ('xablau')
  }
}

const mapStateToProps = (state) => ({
  token: state.receiveToken.token,
});

/* Game.propTypes = {
  token: PropTypes.string.isRequired,
}; */

export default connect(mapStateToProps/* , mapDispatchToProps */)(Game);
