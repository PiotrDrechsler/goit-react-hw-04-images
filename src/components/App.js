import { Component } from 'react';
import { Notify } from 'notiflix';

import s from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchHitsByQuery } from '../services/api';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      query: '',
      page: 1,
      isLoading: false,
      showBtn: false,
      showModal: false,
      largeImageURL: '',
      error: null,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      query: e.target.search.value,
      isLoading: true,
      images: [],
    });
    this.fetchGallery(e.target.search.value, this.state.page);
  };

  onNextPage = () => {
    this.setState({
      page: this.state.page + 1,
      isLoading: true,
    });
    this.fetchGallery(this.state.query, this.state.page + 1);
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  async fetchGallery(query, page) {
    try {
      const response = await fetchHitsByQuery(query, page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...response],
        };
      });
      if (response.length < 12) {
        this.setState({ showBtn: false });
      }
      if (response.length === 12) {
        this.setState({ showBtn: true });
      }
      if (response.length === 0) {
        Notify.failure('No matches found!');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {isLoading && <Loader />}
        {showBtn && <Button onNextPage={this.onNextPage} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
