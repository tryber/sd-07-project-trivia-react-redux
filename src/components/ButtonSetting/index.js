import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonSetting extends Component {
  render() {
    return (
      <Link to="/settings">
        <button type="button" data-testid="btn-settings">test</button>
      </Link>
    );
  }
}

export default ButtonSetting;
