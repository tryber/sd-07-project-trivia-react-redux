import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class PlayGameHeader extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } alt="gravatar" />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(PlayGameHeader);
