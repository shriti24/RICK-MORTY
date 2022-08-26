export const getNextCharacters = (pgNumber) => {
  return (dispatch) => {
    dispatch({
      type: 'add',
      payload: pgNumber,
    });
  };
};
