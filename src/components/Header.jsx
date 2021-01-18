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
    const { name, score } = this.props;
    const { avatar } = this.state;
    return (
      <div>
        <p data-testid="header-player-name">
          {name}
        </p>
        <p data-testid="header-score">
          {score}
        </p>
        <img src={ avatar } data-testid="header-profile-picture" alt="avatar" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  score: state.login.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
