import { Component } from 'react';
import PropTypes from "prop-types";

import s from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={this.props.onSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__button__label}>Search</span>
        </button>
        <input
          className={s.SearchForm__input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
