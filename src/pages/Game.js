import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    /* const { token } = this.props; */
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.receiveToken.token,
});

/* Game.propTypes = {
  token: PropTypes.string.isRequired,
}; */

export default connect(mapStateToProps/* , mapDispatchToProps */)(Game);
