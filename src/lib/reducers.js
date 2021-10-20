export const formReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE INPUT':
      return {
        ...state,
        [action.field]: action.payload,
      };
    case 'RESET INPUT':
      return {
        ...state,
        [action.field]: '',
      };
    default:
      return state;
  }
};
