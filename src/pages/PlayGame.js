import React from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../action';

class PlayGame extends React.Component {

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  render() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    return (<h1>Hello</h1>);
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getToken: () => dispatch(fetchAPI()),
  });

const mapStateToProps = ({ userReducer: { apiToken: { token } } }) => ({
  token,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
