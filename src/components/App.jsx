import { Component } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'servises/moviesApi';
export class App extends Component {
  state = {
    isListShown: false,
    movies: [],
    isLoading: false,
    page: 1,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.isListShown !== this.state.isListShown &&
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
  }
  showList = () => {
    this.setState(prev => {
      return { isListShown: !prev.isListShown };
    });
  };

  render() {
    return (
      <div>
        <Button
          clickHandler={this.showList}
          textContent={
            this.state.isListShown ? 'Hide movies list' : 'Shove movies list'
          }
        />
      </div>
    );
  }
}
