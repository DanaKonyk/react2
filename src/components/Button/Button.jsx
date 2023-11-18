export const Button = ({ textContent, clickHandler }) => {
  return (
    <button type="button" onClick={clickHandler}>
      {textContent}
    </button>
  );
};
