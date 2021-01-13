import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { requestGravatar } from './../../actions/';

class Header extends React.Component {
  geraImagem() {
    const { gravatarEmail } = this.props;
    md5(gravatarEmail);
  }
  render() {
    const { name, score, gravatarEmail} = this.props;
    return (
      <header data-testid="">
        <img data-testid="header-profile-picture" src="" alt="" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(requestGravatar()),
});

const mapStateToProps = (state) => ({
  name: state.Header.name,
  assertions: state.Header.assertions,
  score: state.Header.score,
  gravatarEmail: state.Header.gravatarEmail,
  loading: state.Header.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
