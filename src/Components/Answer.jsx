import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { hasClicked } = this.props;

    hasClicked();
  }

  render() {
    const { answer, status, index, style, isDisabled, isOver } = this.props;
    const data = status === 'correct' ? `${status}-answer` : `${status}-answer-${index}`;
    return (
      <button
        id={ answer }
        type="button"
        disable={ isOver.timer === 0 ? 'true' : 'false' || isDisabled }
        className={ style }
        data-testid={ data }
        onClick={ () => this.handleClick()
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  isOver: state.timer,
});

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isOver: PropTypes.objectOf.isRequired,
  style: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  hasClicked: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, null)(Answer);
