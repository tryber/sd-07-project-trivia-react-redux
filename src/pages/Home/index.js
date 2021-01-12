import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      email: '',
      auth: false,
    };
  }

  componentDidUpdate() {
    const { updateEmail, updateName } = this.props;
    const { name, email } = this.state;
    updateEmail(email);
    updateName(name);
  }

  handleChange({ target }) {
    const { email, name } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    this.setState({ [target.id]: target.value });

    if (regex.test(email) && name) {
      this.setState({ auth: true });
    } else {
      this.setState({ auth: false });
    }
  }

  render() {
    const { name, email, auth } = this.state;
    return (
      <div>
        <input
          type="text"
          id="name"
          placeholder="Insira seu nome"
          onChange={ (e) => this.handleChange(e) }
          value={ name }
          data-testid="input-player-name"
        />
        <input
          type="text"
          id="email"
          placeholder="Insira seu email"
          onChange={ (e) => this.handleChange(e) }
          value={ email }
          data-testid="input-gravatar-email"
        />

        <button type="button" disabled={ !auth } data-testid="btn-play">
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (email) => dispatch(userActions.updateEmail(email)),
  updateName: (name) => dispatch(userActions.updateName(name)),
});

export default connect(null, mapDispatchToProps)(Home);

Home.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
};
