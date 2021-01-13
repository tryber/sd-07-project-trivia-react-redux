import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class GameHeader extends Component {
  constructor(){
    super();
    this.fetchGravatar = this.fetchGravatar.bind(this);
  }

   fetchGravatar(){
    const { getEmail } = this.props;
    const hashEmail = md5(getEmail);
    const endPoint = `https://www.gravatar.com/avatar/${hashEmail}`;
    return endPoint;
  }

  componentDidMount(){
    this.fetchGravatar();
  }

  render() {
    const { getName } = this.props;
    return(
      <header>
        <img data-testid="header-profile-picture" src={ this.fetchGravatar() } alt={ getName } />
        <p date-testid="header-player-name">{ getName }</p>
        <p data-testid="header-score">Score 0</p>
      </header>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  getEmail: userReducer.email,
  getName: userReducer.name,
});

export default connect(mapStateToProps)(GameHeader);
