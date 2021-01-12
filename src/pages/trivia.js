import React from 'react';
import {connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Trivia extends React.Component {
  constructor (props) {
    super(props);
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.state ={
      urlImg,
      placar: 0,
    }
  }

  fetchGravatar () {
    const  { emailSave} = this.props;
    const hash = md5(emailSave);
    const url = `https://www.gravatar.com/avatar/${hash}`
    this.setState({
      urlImg: url,
    })
  }

  componentDidMount() {
    this.fetchGravatar();
  }
  

  render() {
    const { emailSave, nameSave, placar} = this.props;
    const { urlImg} = this.state;
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{nameSave}</h1>
          <h2>{emailSave}</h2>
          <h2 data-testid="header-score">{placar}</h2>
          <img data-testid="header-profile-picture" src={urlImg} ></img>

        </header>
        <h1 data-testid="settings-title">Trivia!</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  emailSave: state.infoPlayer.emailPlayer,
  nameSave: state.infoPlayer.namePlayer
})

export default connect (mapStateToProps) (Trivia);
