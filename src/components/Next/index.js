import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Next extends Component {
  render() {
    const { dataTestid } = this.props;
    return (
      <section>
        <div className="circle">
          <div className="triangle-right" data-testid={ dataTestid } />
        </div>
      </section>
    );
  }
}

Next.propTypes = {
  dataTestid: PropTypes.string,
};

Next.defaultProps = {
  dataTestid: '',
};

export default Next;
