import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensagem: '',
    };
  }
  
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
export default Feedback;


