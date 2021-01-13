import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestGravatar } from '../../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.geraImagem = this.geraImagem.bind(this);
  }

  geraImagem() {
    const { gravatarEmail, requestAPI } = this.props;
    requestAPI(md5(gravatarEmail));
  }

  render() {
    const { name, score } = this.props;
    return (
      <header>
        {console.log('Name em Header: ', name)}
        <img data-testid="header-profile-picture" src={ this.geraImagem } alt="avatar" />
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
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  loading: state.player.loading,
});

Header.propTypes = {
  requestAPI: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
