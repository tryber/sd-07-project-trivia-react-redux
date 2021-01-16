import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CustomHeader, CustomPlayAgain } from '../components';

class FeedBack extends Component {
  constructor() {
    super();
    this.goHomeAgain = this.goHomeAgain.bind(this);
  }

  goHomeAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { name, email, score } = this.props;
    return (
      <div>
        <CustomHeader name={ name } email={ email } score={ score } />
        <h1 data-testid="feedback-text">FeedBack</h1>
        <CustomPlayAgain goHome={ this.goHomeAgain } />
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { name, email },
  playerReducer: { score },
}) => ({
  name, email, score,
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
