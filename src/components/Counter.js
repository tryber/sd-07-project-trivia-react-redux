import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCounter } from '../actions';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.counterFunc = this.counterFunc.bind(this);
  }

  componentDidMount() {
    this.counterFunc();
  }

  counterFunc() {
    const second = 1000;

    this.timer = setInterval(() => {
      const { clicked, isClicked, setCounter, count } = this.props;

      if (count === 0 || clicked) {
        clearInterval(this.timer);
        isClicked();
        return
      }
      setCounter();
    }, second);
  }

  render() {
    const { count } = this.props;

    return <p>{ count }</p>;
  }
}

const mapStateToProps = (state) => ({
  count: state.token.count,
});

const mapDispatchToProps = dispatch => ({
  setCounter: () => dispatch(setCounter()),
});

Counter.propTypes = {
  clicked: PropTypes.bool.isRequired,
  isClicked: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
