const MoviesList = ({ movies, handleModal }) => {
  return (
    <ul>
      {movies.map(({ id, title, vote_count, poster_path }) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>Votes: {vote_count}</p>
          <button
            onClick={() => handleModal({ src: poster_path, alt: title })}
            type="button"
          >
            Show poster
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
