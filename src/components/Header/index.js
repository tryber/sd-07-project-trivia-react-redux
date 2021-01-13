import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLink: '',
    };
  }

  componentDidMount() {
    this.getImageLink();
  }

  getImageLink() {
    const { email } = this.props;
    const link = `https://www.gravatar.com/avatar/${md5(email)}`;

    this.setState({ imageLink: link });
  }

  render() {
    const { imageLink } = this.state;
    const { name } = this.props;

    return (
      <div>
        <img
          src={ imageLink }
          alt={ `Imagem de ${name}` }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
