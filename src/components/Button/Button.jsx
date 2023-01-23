import { Component } from 'react';
import PropTypes from 'prop-types';

import s from '../Button/Button.module.css';

export class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={s.Button}
        onClick={this.props.onNextPage}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onNextPage: PropTypes.func,
};
