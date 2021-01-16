import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Next extends Component {
  render() {
    const { dataTestid, onClick, visibility } = this.props;
    return (
      <section>
        {/* <div role="button" onClick={ onClick } className="circle"></div> */}
        <button
          type="button"
          onClick={ onClick }
          className={ `circle ${visibility}` }
        >
          <div className="triangle-right" data-testid={ dataTestid } />
        </button>
      </section>
    );
  }
}

Next.propTypes = {
  dataTestid: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  visibility: PropTypes.string,
};

Next.defaultProps = {
  dataTestid: '',
  visibility: '',
};

export default Next;
