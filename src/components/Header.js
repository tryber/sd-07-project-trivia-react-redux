import React, { Component } from 'react';
import JsGravatar from '@gravatar/js'

export default class Header extends Component {
  render() {
    const userProfilePic = Gravatar({ email: 'example@example.com' });
    console.log(userProfilePic);
    return (
      <header>

      </header>
    );
  }
}
