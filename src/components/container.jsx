import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../services/triviaLocalStorage';
import { getApiTrivia } from '../actions';

class Container extends Component {
  async componentDidMount() {
    const data = await fetchTrivia();
    const { saveTrivia } = this.props;
    saveTrivia(data);
  }

  render() {
    return (
      <div>
        <section>
          <h2 data-testid="question-category">category</h2>
          <p data-testid="question-text">question</p>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveTrivia: (data) => dispatch(getApiTrivia(data)),
});

Login.propTypes = {
  saveTrivia: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Container);
