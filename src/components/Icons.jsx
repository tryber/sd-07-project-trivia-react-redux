import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GetIcon extends Component {
  constructor() {
    super();

    this.state = {
      iconsIndex: {
        ReturnArrowIcon: [
          `M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 
          2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 
          0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 
          1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z`,
        ],
        ShoppingCartIcon: [
          `M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 
          .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 
          1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 
          0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 
          1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 
          12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 
          0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 
          0 2 1 1 0 0 0 0-2z`,
        ],
        AddShoppingCartIcon: [
          `M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 
          3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 
          0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 
          1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 
          12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 
          0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 
          2 1 1 0 0 0 0-2z`,

          `M8.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 
          1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z`,
        ],
        CloseIcon: [
          `M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 
          1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 
          8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 
          5.354a.5.5 0 0 1 0-.708z`,
        ],
        DashIcon: [
          'M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z',
        ],
        PlusIcon: [
          `M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 
          0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z`,
        ],
        SearchIcon: [
          `M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 
          1.415l-3.85-3.85a1 1 0 0 1 0-1.415z`,

          `M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 
          6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z`,
        ],
        BoxArrowDownLeftIcon: [
          `M7.364 12.5a.5.5 0 0 0 .5.5H14.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 
          1.5 0 0 0 14.5 0h-10A1.5 1.5 0 0 0 3 1.5v6.636a.5.5 0 1 0 1 
          0V1.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 
          1-.5.5H7.864a.5.5 0 0 0-.5.5z`,

          `M0 15.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H1.707l8.147-8.146a.5.5 
          0 0 0-.708-.708L1 14.293V10.5a.5.5 0 0 0-1 0v5z`,
        ],
        gearFillIcon: [
          `M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 
          1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 
          1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 
          0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 
          2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 
          1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 
          2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 
          .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 
          1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 
          1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 
          2.929 0 0 1 0 5.858z`,
        ],
        volumeMuteFill: [
          `M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 
          0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 
          2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 
          8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 
          1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z`,
        ],
        volumeUpFill: [
          `M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 
          0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 
          5.303l.708.707z`,
          `M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 
          0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 
          1-1.61 3.89l.706.706z`,
          `M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 
          5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 
          3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 
          10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z`,
        ],
      },
    };
  }

  render() {
    const { props, state } = this;
    const { name, className } = props;
    const paths = state.iconsIndex[name];

    return (
      <svg width="1.8em" viewBox="0 0 16 16" className={ className } xmlns="http://www.w3.org/2000/svg">
        { paths.map((path) => <path key={ path } fillRule="evenodd" d={ path } />) }
      </svg>
    );
  }
}

GetIcon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
}.isRequired;

export default GetIcon;
