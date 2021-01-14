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
      const { clicked, isClicked, set, count } = this.props;

      if (count === 0 || clicked) {
        clearInterval(this.timer);
        isClicked();
        return;
      }
      set();
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

const mapDispatchToProps = (dispatch) => ({
  set: () => dispatch(setCounter()),
});

Counter.propTypes = {
  clicked: PropTypes.bool.isRequired,
  isClicked: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  set: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
