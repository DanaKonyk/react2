import { Component } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'servises/moviesApi';
import MoviesList from './MoviesList/MoviesList';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    isListShown: false,
    movies: [],
    isLoading: false,
    page: 1,
    currentPoster: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      (prevState.isListShown !== this.state.isListShown ||
        prevState.page !== this.state.page) &&
      this.state.isListShown
    ) {
      this.setState({ isLoading: true });
      fetchMovies(this.state.page)
        .then(data =>
          this.setState(prev => ({
            movies: [...prev.movies, ...data.data.results],
          }))
        )
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
    if (
      prevState.isListShown !== this.state.isListShown &&
      !this.state.isListShown
    ) {
      this.setState({
        movies: [],
        page: 1,
      });
    }
  }

  showList = () => {
    this.setState(prev => {
      return { isListShown: !prev.isListShown };
    });
  };

  showNextPage = () => {
    this.setState(prev => {
      return { page: prev.page + 1 };
    });
  };

  openModal = data => {
    this.setState({ currentPoster: data });
  };

  closeModal = () => {
    this.setState({ currentPoster: null });
  };

  render() {
    const { isListShown, movies, currentPoster, isLoading } = this.state;
    return (
      <div>
        <Button
          clickHandler={this.showList}
          textContent={isListShown ? 'Hide movies list' : 'Show movies list'}
        />
        {isListShown && (
          <>
            <MoviesList movies={movies} handleModal={this.openModal} />{' '}
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                clickHandler={this.showNextPage}
                textContent="Load more"
              />
            )}
          </>
        )}
        {currentPoster && (
          <Modal poster={currentPoster} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
