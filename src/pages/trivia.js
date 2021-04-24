import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.state = {
      urlImg,
      placar: 0,
    };
  }

  componentDidMount() {
    this.fetchGravatar();
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
    const { emailSave, nameSave } = this.props;
    const { urlImg, placar } = this.state;
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{nameSave}</h1>
          <h2>{emailSave}</h2>
          <h2 data-testid="header-score">{placar}</h2>
          <img data-testid="header-profile-picture" src={ urlImg } alt="Gravatar" />

        </header>
        <h1 data-testid="settings-title">Trivia!</h1>
      </div>
    );
  }
}

Trivia.propTypes = {
  emailSave: PropTypes.string.isRequired,
  nameSave: PropTypes.string.isRequired,
  // placar: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  emailSave: state.infoPlayer.emailPlayer,
  nameSave: state.infoPlayer.namePlayer,
});

export default connect(mapStateToProps)(Trivia);
