import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.fetchAvatar = this.fetchAvatar.bind(this);

    this.state = {
      avatar: '',
    };
  }

  async componentDidMount() {
    const { email } = this.props;
    const hash = md5(email);
    const fetchAvatar = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.fetchAvatar(fetchAvatar.url);
  }

  fetchAvatar(avatarUrl) {
    this.setState({ avatar: avatarUrl });
  }

  render() {
    const { name, scoreboard } = this.props;
    const { avatar } = this.state;
    return (
      <div
        style={ {
          display: 'flex',
          marginBottom: 50,
        } }
      >
        <img src={ avatar } data-testid="header-profile-picture" alt="avatar" />
        <p
          style={ {
            marginLeft: 20,
          } }
          data-testid="header-player-name"
        >
          {`Jogador: ${name}`}
        </p>
        <p
          style={ {
            marginLeft: 80,
          } }
          data-testid="header-score"
        >
          {`Pontos: ${scoreboard}`}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  scoreboard: state.login.scoreboard,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scoreboard: PropTypes.string.isRequired,
};
