import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { render } from '@testing-library/react';
import { connect } from 'react-redux';

class GameHeader extends Component {
  render() {
    return(
      <header>

      </header>
    );
  }
}

const mapStateToProps = () => {

}

export default connect()(GameHeader);