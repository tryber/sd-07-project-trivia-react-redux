import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlImg: '',
    };
  }

  fetchGravatar() {
    const { emailSave } = this.props;
    const hash = md5(emailSave);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      urlImg: url,
    });
  }

  render() {
    const player = JSON.parse(localStorage.getItem('player'));
    const { score } = player;
    const { emailSave, nameSave } = this.props;
    const { urlImg } = this.state;
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{nameSave}</h1>

          <h2>{emailSave}</h2>
          <h2 data-testid="header-score">{score}</h2>
          <img data-testid="header-profile-picture" src={ urlImg } alt="Gravatar" />

        </header>
        <h1>FeedBack</h1>
      </div>
    );
  }
}

FeedBack.propTypes = {
  emailSave: PropTypes.string.isRequired,
  nameSave: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailSave: state.infoPlayer.emailPlayer,
  nameSave: state.infoPlayer.namePlayer,
  tokenValue: state.token.token,
});

export default connect(mapStateToProps)(FeedBack);
