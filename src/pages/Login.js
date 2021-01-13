import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormLogin from '../components/FormLogin';
import { fetchTokenAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gravatarEmail: '',
      // assertions: '',
      score: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateImputs = this.validateImputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  validateImputs() {
    const { gravatarEmail, name, score } = this.state;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(score);
    if (emailValidator.test(gravatarEmail) && name.length) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { fetchTokenActionProps } = this.props;
    await fetchTokenActionProps();
    const { game, history } = this.props;
    const { payload } = game;
    localStorage.setItem('token', JSON.stringify(payload));
    const player = { player: this.state };
    localStorage.setItem('state', JSON.stringify(player));
    history.push('/game');
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    return (
      <FormLogin
        handleChange={ this.handleChange }
        validateImputs={ this.validateImputs }
        handleClick={ this.handleClick }
        handleSettings={ this.handleSettings }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTokenActionProps: () => dispatch(fetchTokenAction()),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  fetchTokenActionProps: PropTypes.func.isRequired,
  game: PropTypes.shape({
    payload: PropTypes.shape({
      response_code: PropTypes.number,
      response_message: PropTypes.string,
      token: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
